import React, {
    Component
} from 'react';
import Match from './match/match';
import styles from './matches-list.module.css';
import { Loader, Grid, Button } from 'semantic-ui-react'
import axios from 'axios';
import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class MatchesList extends Component {

    baseURL = '/api?request=';
    // baseURL = 'https://data.nba.net';
    
    formatDate = date => date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
    getDayGamesURL = formattedDate => `/prod/v2/${formattedDate}/scoreboard.json`;

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            games: [],
            date: new Date(),
        };
    }

    async componentDidMount() {
        await this.getNBAGamesToday();
    }


    dayHandler = async (offset) => {
        this.state.date.setDate(this.state.date.getDate() + offset);
        const newDate = new Date(this.state.date);
        this.setState({games: null, date: newDate});
        await this.getNBAGamesToday();
    }
    
    async getNBAGamesToday() {
        // this.setState({games: null});
        const dateFormatted = this.formatDate(this.state.date);
        const res2 = await axios.get(this.baseURL + this.getDayGamesURL(dateFormatted));
        const games = await res2.data.games;
        this.setState({
          games: games
        });
        console.log(this.state);
        return this.state;
    }

    render() {
        let gamesList = null;

        if (this.state.games===null || this.state.games===undefined){
            gamesList = (    
                <div className={styles.divider}>
                    <Loader className='loader' size='large' active content='Fetching games...' />
                </div>);
        } else {
            gamesList = this.state.games.map(match => {
                return ( 
                    <div onClick={() => this.setState({selected: match.gameId})}>
                        <Link to={'/app/matches/' + this.formatDate(this.state.date) + '/' + match.gameId} style={{ textDecoration: 'none', color: 'black'}}>
                            <Match
                            selected={this.state.selected === match.gameId ? true : false}
                            date={this.state.date}
                            match={match} 
                            key={match.gameId}/> 
                        </Link>
                    </div>
                );
            });
        }
        
        if (gamesList.length===0) {
            gamesList =  (
                <div className={styles.divider}>
                    <h3>No Games Today</h3>
                </div>);
        }

        return ( 
            <>
                <Button.Group>
                    <Button onClick={() => this.dayHandler(-1)}>Prev Day</Button>
                    <Button onClick={() => this.dayHandler(1)}>Next Day</Button>
                </Button.Group>
                <h1 style={{margin: '25px'}}>{this.state.date.toDateString()}</h1>
                <div>
                    {gamesList} 
                </div>
            </>
        );
    }
}

export default MatchesList;