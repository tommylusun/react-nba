import React, { Component } from 'react';
import styles from './players-profile.module.css';
import {Helmet} from "react-helmet";
import { urlConstants } from '../../utils/url-constants';
import axios from 'axios'
import PlayerStats from './player-profile/player-stats';
import PlayerDetails from './player-profile/player-details';
import { connect } from 'react-redux'


class PlayerProfile extends Component {

    state = {
        searchValue: '',
        personId: 0,
        playerDetails: {},
        playerStats: null
    }

    async componentDidMount() {
        await this.setState({personId: this.props.match.params.personId});
        let playerDetails = await this.props.players.find( person => person.personId === this.state.personId);
        let teamName = await this.props.teams.find( team => team.teamId === playerDetails.teamId);
        playerDetails['teamName']=teamName.fullName;
        const playerStats = await this.getPlayerStats(this.state.personId);
        await this.setState({playerStats: playerStats});
        await this.setState({playerDetails: playerDetails});
    }

    componentWillReceiveProps() {
    }

    getPlayerStats = async (id) => {
        let playerstats = await axios.get(urlConstants.BASE_URL + urlConstants.GET_PLAYER_STATS(id));
        return playerstats.data.league.standard.stats;
    }

    onInputChange(event) {
        if (event.key === 'Enter' ){
            this.props.history.push('/app/players?s='+this.state.searchValue);
        }
    }

    render() {
        let imgsrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.personId}.png`
        let player = this.state.playerDetails;

        return (
            <div className={styles.container}> 
                <Helmet>
                    <title>{`${player.firstName}`} {`${player.lastName}`} Profile - 2018-2019 NBA Player Simply Stats</title>
                </Helmet>
                <div className={[styles.playersContainer,'containerCard'].join(' ')}>
                    <h1>2018 Active NBA Players</h1> 

                    <div className={styles.searchHeader}>
                        <input placeholder='Enter name' className={[styles.searchBar,'innerCard'].join(' ')} type='text' value={this.state.searchValue} onKeyPress={(e) => this.onInputChange(e)} onChange={(event)=> this.setState({searchValue: event.target.value})}/>
                    </div>

                    <div className={styles.playersSearchContainer}>
                        
                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <img src={imgsrc} alt={this.state.personId}/>
                        </div>
                        <div>
                            {this.state.playerDetailss !== null ? <PlayerDetails profile={this.state.playerDetails}></PlayerDetails> : null}
                        </div>
                        <div className={styles.playerStatsSection}>
                            {this.state.playerStats !== null ? <PlayerStats stats={this.state.playerStats}></PlayerStats> : null}
                        </div>
                        
                    </div>
                </div>
            </div>);
    }
}
const mapStateToProps = state => ({
    teams: state.teams,
    players: state.players
});
export default connect(mapStateToProps)(PlayerProfile);