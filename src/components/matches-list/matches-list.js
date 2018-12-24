import React, {
    Component
} from 'react';
import Match from './match/match';
import styles from './matches-list.module.css';
import { Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { urlConstants } from '../../constants/url-constants';


class MatchesList extends Component {

    baseURL = urlConstants.BASE_URL;

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            games: [],
            date: new Date(),
            today: new Date()
        };
    }

    async componentDidMount() {
        if (localStorage.getItem('listDate') === null) {
            localStorage.setItem('listDate', new Date());
        } else {
            this.setState({date: new Date(await localStorage.getItem('listDate'))});
        }
        await this.getNBAGamesToday();
        setInterval( async () => {
            await this.getNBAGamesToday();
          }, 5000);
        
    }


    dayHandler = async (offset) => {
        this.state.date.setDate(this.state.date.getDate() + offset);
        const newDate = new Date(this.state.date);
        localStorage.setItem('listDate', newDate);
        this.setState({games: null, date: newDate});
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
        return this.props.teams.find( team => team.teamId === teamId);
    }

    render() {
        let gamesList = null;
        if (this.state.games===null || this.state.games===undefined){
            gamesList = (  
                <div className={styles.list}>
                    <div className={[styles.placeholder,'innerCard'].join(' ')}>...</div>
                    <div className={[styles.placeholder,'innerCard'].join(' ')}>...</div>
                    <div className={[styles.placeholder,'innerCard'].join(' ')}>...</div>
                    <div className={[styles.placeholder,'innerCard'].join(' ')}>...</div>
                    <div className={[styles.placeholder,'innerCard'].join(' ')}>...</div>
                </div>);  
                // <div className={styles.divider}>
                //     <Loader className='loader' size='large' active content='Fetching games...' />
                // </div>);
        } else {
            gamesList = this.state.games.map(match => {
                match.hTeam['fullName'] = this.getTeamName(match.hTeam.teamId).ttsName;
                match.vTeam['fullName'] = this.getTeamName(match.vTeam.teamId).ttsName;
           
                
                return ( 
                    <div className={styles.Match} onClick={() => this.setState({selected: match.gameId})}>
                        <Link to={'/app/matches/' + urlConstants.FORMAT_DATE(this.state.date) + '/' + match.gameId} style={{ textDecoration: 'none', color: 'black'}}>
                            <Match
                            selected={this.state.selected === match.gameId ? true : false}
                            date={this.state.date}
                            match={match} 
                            key={match.gameId}/> 
                        </Link>
                    </div>
                );
            });
            if (gamesList.length===0) {
                gamesList =  (
                    <div className={styles.divider}>
                        <h3>No Games Today</h3>
                    </div>);
            }
        }
        let today = null;
        if (this.state.date > this.state.today) {
            today =  "Upcoming Matches";
        } else if (this.state.date < this.state.today) {
            today = "Past Matches";
        } else {
            today = "Today's Matches";
        }

        return ( 
            <div className={[styles.MatchesList, 'containerCard'].join(' ')}>

                <div className={[styles.header].join(' ')}>
                    <div className={styles.dateHeader}>
                        <div onClick={() => this.dayHandler(-1)} className={styles.arrowContainer}>
                            <i style={{margin: 'auto'}} className="fas fa-angle-left"></i>
                        </div>   
                        <h3 className={styles.date}>{this.state.date.toDateString()}</h3>  
                        <div onClick={() => this.dayHandler(1)} className={styles.arrowContainer}>
                            <i style={{margin: 'auto'}} className="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div>
                        <div className={styles.todayHeader}>{today}</div>
                    </div>
                </div>
                <div className={styles.list}>
                    {gamesList} 
                </div>
            </div>
        );
    }
}

export default MatchesList;