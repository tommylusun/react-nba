import React, { Component } from 'react';
import styles from './team-profile.module.css';
import axios from 'axios';
import { urlConstants } from '../../../utils/url-constants';
// import { Loader} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import TeamStats from './team-stats';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'

class TeamProfile extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamRosterURL = urlConstants.GET_TEAM_ROSTER;
    getPlayerStatsURL = urlConstants.GET_PLAYER_STATS;

    state = {
        roster: [],
        list: (<div>Loading...</div>),
        teamDetails: {},
        teamStats: null
    };
    async componentDidMount() {
        await this.getTeamData(this.props.match.params.teamId);
        await this.playersList();
    }

    async getTeamData(teamId) {
        const data = await axios.get(this.baseURL + this.getTeamRosterURL(teamId));
        const roster = await data.data.league.standard.players;
        // const teamDetails = await this.props.teams.find( team => team.teamId === teamId);
        const teamDetails = await this.props.theteams.find(team => team.teamId === teamId);
        if (!!this.props.teamStats) {
            const teamStats = await this.props.teamStats.find(team => team.teamId === teamId);
            this.setState({
                teamStats: teamStats
            });
        }

        this.setState({
            roster: roster,
            teamDetails: teamDetails
        });
        return data;
    }

    getPlayerStats(personId) {
        return axios.get(this.baseURL + this.getPlayerStatsURL(personId)).then((data) => {
            return data.data.league.standard.stats;
        });
    }


    playersList = async () => {
        this.setState({
            list: <div>Loading...</div>
        });
        const list = this.state.roster.map((player) => {
            return this.getPlayerStats(player.personId).then((playerStats) => {
                let playerDetails = this.props.players.find(person => person.personId === player.personId);
                let imgsrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`

                return (
                    <div className={[styles.playerContainer, 'innerCard'].join(' ')}>
                        <Link to={'/app/players/' + player.personId}>
                            <div>
                                <img style={{ width: '100%' }} src={imgsrc} alt={playerDetails.lastName} />
                            </div>
                            <div style={{ borderBottom: '1px solid #00000030', height: '50px' }}>
                                <h5 >{playerDetails.firstName} {playerDetails.lastName}</h5>
                            </div>
                        </Link>
                        <li>
                            <label className={styles.statDesc}><b>Stat</b></label>
                            <label><b>Career</b></label>
                            <label><b>2018</b></label>
                        </li>
                        <li>
                            <label className={styles.statDesc}>ppg:</label>
                            <label>{playerStats.careerSummary.ppg}</label>
                            <label>{playerStats.latest.ppg}</label>
                        </li>
                        <li>
                            <label className={styles.statDesc}>apg:</label>
                            <label>{playerStats.careerSummary.apg}</label>
                            <label>{playerStats.latest.apg}</label>

                        </li>
                        <li>
                            <label className={styles.statDesc}>rpg:</label>
                            <label>{playerStats.careerSummary.rpg}</label>
                            <label>{playerStats.latest.rpg}</label>

                        </li>

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
        let teamStats = null;
        if (this.state.roster === null || this.state.list === null || this.state.teamStats === null) {
            return (
                <div className={styles.loader}>
                    {/* <Loader className={styles.loader} size='large' active content='Fetching team...' /> */}
                </div>
            );
        }
        if (!!this.state.teamStats) {
            teamStats = (<TeamStats teamStats={this.state.teamStats}></TeamStats>);
        }

        return (
            <div className={[styles.container, 'containerCard'].join(' ')}>
                <Helmet>
                    <title>{`${this.state.teamDetails.fullName}`} Team Profile 2018-2019 - NBA Simply Stats</title>
                </Helmet>
                <div className={styles.header}>
                    <h1>{this.state.teamDetails.fullName}</h1>
                </div>
                <div className={[styles.teamStatsContainer, 'innerCard'].join(' ')}>
                    <div className={styles.header}>
                        <h4>Team Stats</h4>
                    </div>
                    <div>
                        {teamStats}
                    </div>
                </div>
                <div className={[styles.playerStatsContainer, 'innerCard'].join(' ')}>
                    <h4>Player Stats </h4>

                    <div className={styles.body}>
                        {this.state.list}
                    </div>
                </div>

            </div>);
    }
}
const mapStateToProps = state => ({
    theteams: state.teams
});
export default connect(mapStateToProps)(TeamProfile);