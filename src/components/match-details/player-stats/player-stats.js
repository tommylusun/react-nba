import React, {
    Component
} from 'react';
import styles from './player-stats.module.css';
import { Table } from 'semantic-ui-react'
import axios from 'axios';
import { Loader } from 'semantic-ui-react'


// import Table2 from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

class PlayerStats extends Component {

    getPlayerStatsURL = (personId) => `https://cors.io/?https://data.nba.net/prod/v1/2018/players/${personId}_profile.json`;

    componentDidMount() {

        this.setState({players: {}});
        
    }


    getPlayerStats = async (id) => {

        console.log(this.getPlayerStatsURL(id));
        let playerstats = await axios.get(this.getPlayerStatsURL(id));
        return playerstats.data.league.standard.stats;

    }
    getMoreStats = async (player) => {
        console.log(player);

        if (this.state !== undefined && this.state.players){
            if (!!this.state.players[player.personId]) {
                let players = Object.assign({},this.state.players);
                players[player.personId] = null;
                this.setState({players: players});
                return;
            }
        }
        let stats = (
            <div className={styles.divider2}>
                <Loader className={styles.loader} size='small' active />

            </div>
        ); 
        let players = Object.assign({},this.state.players);
        players[player.personId] = stats;
        this.setState({players: players});

        let playerstats = await this.getPlayerStats(player.personId);
        console.log(playerstats);

        if (playerstats !== undefined){
            let stats = (
                <li className={styles.morestats}>
                    <li>
                        <label></label>
                        <label className={styles.players}>2018 Season</label>
                        <label>{playerstats.latest.ppg}</label>
                        <label>{playerstats.latest.apg}</label>
                        <label>{playerstats.latest.rpg}</label>
                        <label>{playerstats.latest.mpg}</label>
                        
                    </li>
                    <li>
                        <label></label>
                        <label className={styles.players}>Career</label>
                        <label>{playerstats.careerSummary.ppg}</label>
                        <label>{playerstats.careerSummary.apg}</label>
                        <label>{playerstats.careerSummary.rpg}</label>
                        <label>{playerstats.careerSummary.mpg}</label>
                    </li>      
                </li>
            );
            let players = Object.assign({},this.state.players);
            players[player.personId] = stats;
            this.setState({players: players});
        }

    }

    showStats = (personId) => {
        if (this.state === null){
            return null;
        }
        if (this.state.players[personId] === undefined) {
            return null;
        } else {
            return this.state.players[personId];
        }

    }
    renderPlayerList = () => {
        return this.props.playerList.map( player => {
            if (player.teamId === this.props.teamId){
                let playerDetails = this.props.players.find( person => person.personId === player.personId);
                if (playerDetails === undefined) {
                    playerDetails = {firstName: "Not",lastName: "Found"};
                }
                const selected = (!!this.state && !!this.state.players[player.personId]) ? styles.highlight : '';
                return (
                    <>
                    <li key={player.personId} className={[styles.playerRow, selected].join(' ')} onClick={() => this.getMoreStats(player)}>
                        <label>{player.pos}</label>
                        <label className={styles.players}>{playerDetails.firstName} {playerDetails.lastName}</label>
                        <label>{player.points}</label>
                        <label>{player.assists}</label>
                        <label>{player.totReb}</label>
                        <label>{player.min}</label>
                    </li>
                    {this.showStats(player.personId)}
                    </>
                    );
            }
            
        });
    }
    
    render() {
        return (
            <div className={styles.PlayersTable}>
                <ul>
                    <li className={styles.header}>
                        <label><b>Pos</b></label>
                        <label className={styles.players}><b>Player</b></label>
                        <label><b>Pts</b></label>
                        <label><b>Ast</b></label>
                        <label><b>Reb</b></label>
                        <label><b>Minutes</b></label>
                    </li>
                    {this.renderPlayerList()}
                </ul>
            </div>

        );
    }
}

export default PlayerStats;