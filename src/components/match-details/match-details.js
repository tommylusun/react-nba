import React, {
    Component
} from 'react';
import styles from './match-details.module.css';
// import styles from './gamees-list.module.css';
import { Loader, Dimmer, Grid } from 'semantic-ui-react'
import PlayerStats from './player-stats/player-stats';
import GameStats from './game-stats/game-stats';
import axios from 'axios';


class gameDetails extends Component {

    loading = (<Loader className={styles.loading} inline='centered' active content='Loading' />);
    // game = 'loading';
    getGameDetailsURL = (formattedDate, gameId) => `/prod/v1/${formattedDate}/${gameId}_boxscore.json`;
    baseURL = 'https://cors.io/?https://data.nba.net';
    state = {game: 'loading'};
    getTeamsURL = '/prod/v2/2018/teams.json';
    getPlayersURL = '/prod/v1/2018/players.json';
    // game = 'loading';


    async componentDidMount() {
        this.hPlayers = this.loading;
        this.vplayers = this.loading;
        console.log(this.props.match.params.id);
        await this.getPlayers();

        // let date = new Date(this.props.match.params.date);
        // console.log(date);
        // this.props.game = 'loading';
        try{
            const matchDetails = await this.getGameDetails(this.props.match.params.date,this.props.match.params.id);
            // matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).fullName;
            // matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).fullName;
            this.setState( {game: matchDetails.data});
            this.game = matchDetails.data;
            console.log(this.game);
          } 
          catch (e) {
            console.log(e);
          } 
        
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps){
            try {
                // this.game = 'loading';
                const matchDetails = await this.getGameDetails(nextProps.match.params.date,nextProps.match.params.id);
                // matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).fullName;
                // matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).fullName;
                this.setState( {game: matchDetails.data});
                this.game = matchDetails.data;
                console.log(this.game);
    
              } 
              catch (e) {
                console.log(e);
              } 
        }
        
    }

    async getPlayers() {
        const res3 = await axios.get(this.baseURL + this.getPlayersURL);
        const players = await res3.data.league.standard;
        this.setState({
          players: players,
        });
        return this.state;
      }

    async getGameDetails(date, gameId) {
        return await axios.get(this.baseURL + this.getGameDetailsURL(date,gameId));
      }
    

    gameStats = (stats) => {
        return (
            <GameStats stats={stats}/>
        );
    }

    render() {
        // this.props.game = null;
        // this.props.game = 'loading';
        if (this.state.game === 'loading' || !!!this.state.players){
            return (
                <div className = {styles['container-placeholder']}>
                    {this.loading}
                </div>
            );
        }
        if (!!this.state.game.stats && !!this.state.game.basicGameData && !!this.state.game.stats.activePlayers){
            this.basicGameData = this.state.game.basicGameData;
            this.game = this.state.game.stats;
            this.home = this.basicGameData.hTeam;
            this.away = this.basicGameData.vTeam;
            this.activePlayers = this.game.activePlayers;
            
                
            if (this.game !== 'loading') {
                this.hPlayers = <PlayerStats playerList={this.activePlayers} players={this.state.players} teamId={this.home.teamId}/>;
                this.vplayers = <PlayerStats playerList={this.activePlayers} players={this.state.players} teamId={this.away.teamId}/>;
            }
            
            return ( 
                <div className={styles.container}>
                <Grid>

                
                        <Grid.Row>
                            <GameStats stats={this.basicGameData}/>
                        </Grid.Row>
                        {/* <div className={styles.playerstats}> */}
                        <Grid.Row centered>
                            <Grid.Column className={styles.playerscol}>
                                    {this.hPlayers}
                            </Grid.Column>
                            <Grid.Column className={styles.playerscol}>
                                    {this.vplayers}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* </div> */}
                </div>
                
            );
        } else {
            return (
                <div className = {styles['container-placeholder']}>
                    <h3>Game Not Started</h3>
                </div>
            );
        }
        

        
    }
}

export default gameDetails;