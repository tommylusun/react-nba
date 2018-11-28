import React, {
    Component
} from 'react';
import styles from './match-details.module.css';
// import styles from './gamees-list.module.css';
import { Loader, Grid } from 'semantic-ui-react'
import PlayerStats from './player-stats/player-stats';
import GameStats from './game-stats/game-stats';
import axios from 'axios';
import {urlConstants} from '../../constants/url-constants';


class gameDetails extends Component {

    baseURL = urlConstants.BASE_URL;


    state = {
        game: 'loading', 
        team1Color: '#ffffff',
        team2Color: '#ffffff'
    };

    loading = (<Loader className={styles.loading} inline='centered' active content='Loading' />);


    async componentDidMount() {
        this.hPlayers = this.loading;
        this.vplayers = this.loading;
        await this.getGameDetails(this.props.match.params.date,this.props.match.params.id);


        setInterval( async () => {
            await this.getGameDetails(this.props.match.params.date,this.props.match.params.id);
          }, 5000);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id ){
            this.setState( {game: 'loading'});
            await this.getGameDetails(nextProps.match.params.date,nextProps.match.params.id);
        }
    }

    async getGameDetails(date, gameId) {
        try {
            const matchDetails = await axios.get(this.baseURL + urlConstants.GET_GAME_DETAILS(date,gameId));
            matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).ttsName;
            matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).ttsName;
            const team1Color = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).primaryColor;
            const team2Color = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).primaryColor;
            this.setState( 
                {
                    game: matchDetails.data,
                    team1Color: team1Color,
                    team2Color: team2Color
                });
            return;
          } 
          catch (e) {
            console.log(e);
          } 
        return true;
    }

    getTeamName(teamId) {
        return this.props.teams.find( team => team.teamId === teamId);
    }
    

    gameStats = (stats) => {
        return (
            <GameStats stats={stats}/>
        );
    }

    render() {

        if (this.state.game === 'loading' || !!!this.props.players){
            return (
                <div className={styles.container}>
                    <div className = {styles['container-placeholder']}>
                        {/* {this.loading} */}
                    </div>
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
                this.hPlayers = <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.home.teamId}/>;
                this.vplayers = <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.away.teamId}/>;
            }
            
            return ( 
                <div className={styles.container}>
                    <Grid className={styles.grid}>
                        <Grid.Row centered className={styles.gameStats}>
                            <GameStats team1Color={this.state.team1Color} team2Color={this.state.team2Color} stats={this.basicGameData}/>
                        </Grid.Row>
                        <Grid.Row centered className={styles.playerStats}>
                            <Grid.Column className={styles.playerscol}>
                                    {this.hPlayers}
                            </Grid.Column>
                            <Grid.Column className={styles.playerscol}>
                                    {this.vplayers}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div  className={styles.container}>
                    <div className = {styles['container-placeholder']}>
                        <h3>Game Not Started</h3>
                    </div>
                </div>
                
            );
        }
        

        
    }
}

export default gameDetails;