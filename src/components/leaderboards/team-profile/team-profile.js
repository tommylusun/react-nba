import React, { Component } from 'react';
import styles from './team-profile.module.css';
import axios from 'axios';
import { urlConstants } from '../../../constants/url-constants';

import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class TeamProfile extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamRosterURL = urlConstants.GET_TEAM_ROSTER;

    state = {
        roster: null
    }
    async componentDidMount() {
        await this.getTeamRoster(this.props.match.params.teamId);

    }


    async getTeamRoster(teamId) {
        const data = await axios.get(this.baseURL + this.getTeamRosterURL(teamId));
        console.log(data);
        const roster = await data.data.league.standard.players;
        this.setState( {
            roster: roster
        });
        return data;
    }
    render() {
        let players = null;
        if (this.state.roster !== null) {
            players = this.state.roster.map ( (player) => {
                return <div><label>{player.personId}</label></div>
            });
        }
        return (
            <div className={[styles.container,'containerCard'].join(' ')}>
                <div className={styles.header}>
                    <h1>Team Profile</h1>
                </div>
                <div className={styles.body}>
                    {players}
                </div>
                
            </div>);
    }
}

export default TeamProfile;