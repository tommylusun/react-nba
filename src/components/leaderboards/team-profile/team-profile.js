import React, { Component } from 'react';
import styles from './team-profile.module.css';
import axios from 'axios';
import { urlConstants } from '../../../constants/url-constants';

import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class TeamProfile extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamRosterURL = urlConstants.GET_TEAM_ROSTER;
    getPlayerStatsURL = urlConstants.GET_PLAYER_STATS;

    state = {
        roster: [],
        list: null,
        teamDetails: {}
    };
    async componentDidMount() {
        await this.getTeamData(this.props.match.params.teamId);
        await this.playersList();
    }

    async getTeamData(teamId) {
        const data = await axios.get(this.baseURL + this.getTeamRosterURL(teamId));
        const roster = await data.data.league.standard.players;
        const teamDetails = await this.props.teams.find( team => team.teamId === teamId);
        this.setState({
            roster: roster,
            teamDetails: teamDetails
        });
        return data;
    }

    getPlayerStats(personId) {
        return axios.get(this.baseURL + this.getPlayerStatsURL(personId)).then((data)=> {
            return data.data.league.standard.stats;
        });
        // console.log(await axios.get(this.baseURL + this.getPlayerStatsURL(personId)));
        // const stats = await data.league.standard.stats;
        // return data;
    }

    playersList = async () => {
        const list = this.state.roster.map ( (player) => {
            return this.getPlayerStats(player.personId) 
            .then((playerStats) => {
                let playerDetails = this.props.players.find( person => person.personId === player.personId);
                return (
                    <div className={[styles.playerContainer,'innerCard'].join(' ')}>
                        <div><h6>{playerDetails.firstName} {playerDetails.lastName}</h6></div>
                        <li>PPG: {playerStats.latest.ppg}</li>
                        <li>RPG: {playerStats.latest.rpg}</li>
                        <li>APG: {playerStats.latest.apg}</li>
                    </div>
                );
            });
        });
        const result = await Promise.all(list);
        this.setState({
            list: result
        });
        return result;
    }

    render() {
        if (this.state.roster === null && this.state.list === null) {
            return (
                <div className={[styles.container,'containerCard'].join(' ')}>
                </div>
            );
        }
        return (
            <div className={[styles.container,'containerCard'].join(' ')}>
                <div className={styles.header}>
                    <h1>{this.state.teamDetails.ttsName}</h1>
                </div>
                <div>

                </div>
                <div className={'innerCard'}>
                    <h5>Player Stats </h5>
                
                    <div className={styles.body}>
                        {this.state.list}
                    </div>
                </div>
                
            </div>);
    }
}

export default TeamProfile;