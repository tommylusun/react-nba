import React, { Component } from 'react';
import styles from './leaderboards.module.css';
import axios from 'axios';
import { urlConstants } from '../../utils/url-constants';
import TeamProfile from './team-profile/team-profile';
import { Route } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux'

class LeaderBoards extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamStandings = urlConstants.GET_TEAM_STANDINGS;
    getTeamStatsURL = urlConstants.GET_TEAM_STATS_RANKING;

    state = {
        east: [],
        west: [],
        teamStats: null,
        mobileSelected: 0
    }

    async componentDidMount() {
        await this.getTeams();
        await this.getTeamStats();
    }

    async getTeamStats () {
        const teamStats = await axios.get(this.baseURL + this.getTeamStatsURL);
        const results = teamStats.data.league.standard.regularSeason.teams;
        this.setState( {
            teamStats: results
        });
        return this.state;
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

    clickHandler = (teamId) => {
        this.props.history.push("/app/leaderboards/"+teamId);
    }

    makeList = (conference) => {
        return (
            <ul className={styles.list}>
                <li className={styles.header}>
                    <label className={styles.smallerCol}><b>Rank</b></label>
                    <label className={styles.teamName}><b>Team</b></label>
                    <label className={styles.smallerCol}><b>Win</b></label>
                    <label className={styles.smallerCol}><b>Loss</b></label>
                    <label><b>Home</b></label>
                    <label><b>Away</b></label>
                    <label><b>L10</b></label>
                </li>
                {conference.map( (team, ind) => {
                    let background = {};
                    if ((ind%2)===0){
                        background = {
                            'background': `#00000010`
                        }
                    }
                    return (
                        <li key={team.teamId} onClick={() => this.clickHandler(team.teamId)} style={background} className={styles.playerRow}>
                            <label className={styles.smallerCol}>{ind+1}</label>
                            <label className={styles.teamName}>{this.getTeamName(team.teamId).fullName}</label>
                            <label className={styles.smallerCol}>{team.win}</label>
                            <label className={styles.smallerCol}>{team.loss}</label>
                            <label>{team.homeWin}-{team.homeLoss}</label>
                            <label>{team.awayWin}-{team.awayLoss}</label>
                            <label>{team.streak}-{team.isWinStreak ? 'W' : 'L'}</label>
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {

        if (!!this.state.east){
            let east = this.makeList(this.state.east);
            let west = this.makeList(this.state.west);
            let width = { width: '35%' };
            let innerWidth = { width: '90%'};
            if (this.props.location.pathname==='/app/leaderboards'){
                width = { width: '100%'};
                innerWidth = { width: '70%'};
            }

            let lists = (
                <div style={width} className={[styles.StandingsContainer]}>
                    <div style={innerWidth} className={[styles.StandingsCard, 'containerCard'].join(' ')}>
                    
                        <div className={styles.standingsHeader}>
                            <h2>Season 2019 Standings</h2>
                        </div>
                        <div className={[styles.listContainer, 'innerCard'].join(' ')}>
                            <div className={styles.confHeader}>
                                <h3>West</h3>
                            </div>
                            {west}
                        </div>
                        <div className={[styles.listContainer, 'innerCard'].join(' ')}>
                            <div className={styles.confHeader}>
                                <h3>East</h3>
                            </div>
                            {east}
                        </div>
                    </div>
                </div>);

            // For Mobile
            if (window.innerWidth < 770) {
                if (!this.props.match.isExact){
                    lists=null;
                } else {
                    let showList = null;
                    if (this.state.mobileSelected === 0){
                        showList = west;
                    } else {
                        showList = east;
                    }
                    lists = (<div style={width} className={[styles.StandingsContainer]}>
                        <div style={innerWidth} className={[styles.StandingsCard, 'containerCard'].join(' ')}>
                        
                            <div className={styles.standingsHeader}>
                                <h3>Season 2019 Standings</h3>
                            </div>
                            <div className={[styles.listContainer, 'innerCard'].join(' ')}>
                                <Tabs fullWidth value={this.state.mobileSelected} onChange={(event,value) => this.setState({mobileSelected: value})} indicatorColor="primary">
                                    <Tab label="West"/>
                                    <Tab label="East" />
                                </Tabs>
                                {showList}
                            </div>
                        </div>
                    </div>);
                }
            }

            return (
                <div className={styles.container}>
                    <Helmet>
                        <title>2018-2019 NBA Season Current Standings - NBA Stats Simplified</title>
                    </Helmet>
                    {lists}
                    <Route path="/app/leaderboards/:teamId" component={ (props) => 
                        <div className={styles.teamProfile}>
                            <TeamProfile 
                            players={this.props.players}
                            teams={this.props.teams}
                            teamStats={this.state.teamStats}
                            {...props}>
                            </TeamProfile>
                        </div>
                    }/>
                </div>
            );
        } else {
            return (<div className={styles.container}>
                <div>
                    <h1>Season 2019 Standings</h1>
                </div>      
            </div>);
        }
    }
}
const mapStateToProps = state => ({
    teams: state.teams,
    players: state.players
});
export default connect(mapStateToProps)(LeaderBoards);
