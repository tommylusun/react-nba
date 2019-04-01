import React, {
    Component
} from 'react';
import Match from './match/match';
import styles from './matches-list.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { urlConstants } from '../../utils/url-constants';
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';

class MatchesList extends Component {

    baseURL = urlConstants.BASE_URL;

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            games: null,
            date: new Date(),
            today: new Date(),
            gamesList: null
        };
    }

    async componentDidMount() {
        await this.getNBAGamesToday();
        this.liveUpdate = setInterval(async () => {
            await this.getNBAGamesToday();
        }, 5000);
    }

    dayHandler = async (offset) => {
        this.state.date.setDate(this.state.date.getDate() + offset);
        await this.getNBAGamesToday();
    }

    async getNBAGamesToday() {
        let listDate = urlConstants.FORMAT_DATE(this.state.date);
        const res2 = await axios.get(this.baseURL + urlConstants.GET_GAMES_BY_DAY(listDate));
        const games = await res2.data.games;
        this.setState({
            games: games
        });
        return this.state;
    }

    getTeamName(teamId) {
        return this.props.teams.find(team => team.teamId === teamId);
    }

    componentWillUnmount() {
        clearInterval(this.liveUpdate);
    }

    render() {
        if (this.state.games === null || this.state.games === undefined) {
        } else {
            this.gamesList = this.state.games.map(match => {
                match.hTeam['city'] = this.getTeamName(match.hTeam.teamId).city;
                match.vTeam['city'] = this.getTeamName(match.vTeam.teamId).city;

                return (
                    <div key={match.gameId} className={styles.Match} onClick={() => this.setState({ selected: match.gameId })}>
                        <Link to={'/app/matches/' + urlConstants.FORMAT_DATE(this.state.date) + '/' + match.gameId} style={{ textDecoration: 'none', color: 'black' }}>
                            <Match
                                selected={this.state.selected === match.gameId ? true : false}
                                date={this.state.date}
                                match={match}
                                key={match.gameId} />
                        </Link>
                    </div>
                );
            });
            if (this.gamesList.length === 0) {
                this.gamesList = (
                    <div className={styles.divider}>
                        <h3>No Games Today</h3>
                    </div>);
            }
        }
        let today = "Matches";
        if (this.state.date > this.state.today) {
            today = "Upcoming Matches";
        } else if (this.state.date < this.state.today) {
            today = "Past Matches";
        } else {
            today = "Today's Matches";
        }

        let list = (<div className={[styles.MatchesList, 'containerCard'].join(' ')}>
            <div className={[styles.header].join(' ')}>
                <div className={styles.dateHeader}>
                    <div onClick={() => this.dayHandler(-1)} className={styles.arrowContainer}>
                        <i style={{ margin: 'auto' }} className="fas fa-angle-left"></i>
                    </div>
                    <h3 className={styles.date}>{this.state.date.toDateString()}</h3>
                    <div onClick={() => this.dayHandler(1)} className={styles.arrowContainer}>
                        <i style={{ margin: 'auto' }} className="fas fa-angle-right"></i>
                    </div>
                </div>
                <div>
                    <div className={styles.todayHeader}>{today}</div>
                </div>
            </div>
            <div className={styles.list}>
                {this.gamesList}
            </div>
        </div>)

        return (
            <>
                <MediaQuery maxWidth={780}>
                    {this.props.location.pathname === '/app/matches' && list}
                </MediaQuery>
                <MediaQuery minWidth={781}>
                    {list}
                </MediaQuery>
            </>);
    }
}
const mapStateToProps = state => ({
    teams: state.teams,
});
export default connect(mapStateToProps)(MatchesList);