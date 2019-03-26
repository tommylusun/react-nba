import React, {
    Component
} from 'react';
import styles from './player-stats.module.css';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { urlConstants } from '../../../utils/url-constants';
import { Link } from 'react-router-dom';

class PlayerStats extends Component {

    baseURL = urlConstants.BASE_URL;

    componentDidMount() {
        this.setState({players: {}});
    }

    getPlayerStats = async (id) => {
        let playerstats = await axios.get(urlConstants.BASE_URL + urlConstants.GET_PLAYER_STATS(id));
        return playerstats.data.league.standard.stats;
    }

    getMoreStats = async (player) => {

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

        if (playerstats !== undefined){
            let stats = (
                <div className={styles.morestats}>
                    <li>
                        <label></label>
                        <label className={styles.players}>2018 Season avg</label>
                        <label>{playerstats.latest.ppg}</label>
                        <label>{playerstats.latest.apg}</label>
                        <label>{playerstats.latest.rpg}</label>
                        <label>{playerstats.latest.mpg}</label>
                        
                    </li>
                    <li>
                        <label></label>
                        <label className={styles.players}>Career avg</label>
                        <label>{playerstats.careerSummary.ppg}</label>
                        <label>{playerstats.careerSummary.apg}</label>
                        <label>{playerstats.careerSummary.rpg}</label>
                        <label>{playerstats.careerSummary.mpg}</label>
                    </li>  
                    <li>
                        <Link to={'/app/players/' + player.personId}>
                            <b style={{textDecoration: 'underline'}}>Player profile</b>
                        </Link>   
                    </li>    
                </div>
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
                const chevronStyle = (!!this.state && !!this.state.players[player.personId]) ? styles.chevronUp : styles.chevronDown;
                return (
                    <>
                        <li key={player.personId} className={[styles.playerRow, selected].join(' ')} onClick={() => this.getMoreStats(player)}>
                            <label>{player.pos}</label>
                            <label className={styles.players}>{playerDetails.firstName} {playerDetails.lastName}</label>
                            <label>{player.points}</label>
                            <label>{player.assists}</label>
                            <label>{player.totReb}</label>
                            <label>{player.min}</label>
                            <span className={chevronStyle}></span>
                        </li>
                        {this.showStats(player.personId)}
                    </>
                );
            } 
            return null;
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