import React, { Component } from 'react';
import styles from './leaderboards.module.css';
import axios from 'axios';
import { urlConstants } from '../../constants/url-constants';

// import { Loader, Grid, Button } from 'semantic-ui-react'
// import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class LeaderBoards extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamStandings = urlConstants.GET_TEAM_STANDINGS;

    state = {
        east: [],
        west: []
    }

    async componentDidMount() {
        await this.getTeams();
    }

    async getTeams() {
        const res = await axios.get(this.baseURL + this.getTeamStandings);
        const east = await res.data.league.standard.conference.east;
        const west = await res.data.league.standard.conference.west;
        this.setState({
        east: east,
        west: west
        });
        return this.state;
    }
    
    getTeamName(teamId) {
        return this.props.teams.find( team => team.teamId === teamId);
    }

    makeList = (conference) => {
        return conference.map( (team, ind) => {
            console.log(team);
            return (
                <li>
                    <label>{ind+1}</label>
                    <label className={styles.teamName}>{this.getTeamName(team.teamId).ttsName}</label>
                    <label>{team.win}</label>
                    <label>{team.loss}</label>
                </li>
            );
        });
    }

    render() {

        if (!!this.state.east){
            let east = this.makeList(this.state.east);
            let west = this.makeList(this.state.west);
            return (
                <div className={styles.container}>
                    <div>
                        <h1>Leaderboards</h1>
                    </div>      
                    <div className={styles.StandingsList}>
                        <div className={[styles.listContainer, 'containerCard'].join(' ')}>
                            <h1>West</h1>
                            <ul>
                                {west}
                            </ul>
                        </div>
                        <div className={[styles.listContainer, 'containerCard'].join(' ')}>
                            <h1>East</h1>
                            <ul>
                                {east}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        
    }

}

export default LeaderBoards;