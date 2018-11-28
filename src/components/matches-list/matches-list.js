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
        const res2 = await axios.get(this.baseURL + urlConstants.GET_GAMES_BY_DAY(urlConstants.FORMAT_DATE(this.state.date)));
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
            gamesList = (  <div></div> );  
                // <div className={styles.divider}>
                //     <Loader className='loader' size='large' active content='Fetching games...' />
                // </div>);
        } else {
            gamesList = this.state.games.map(match => {
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
        

        return ( 
            <div className={styles.MatchesList}>
                <div className={styles.header}>
                    <Button.Group>
                        <Button onClick={() => this.dayHandler(-1)}>Prev Day</Button>
                        <Button onClick={() => this.dayHandler(1)}>Next Day</Button>
                    </Button.Group>
                    <h3 style={{margin: '25px'}}>{this.state.date.toDateString()}</h3>  
                </div>
                <div className={styles.list}>
                    {gamesList} 
                </div>
            </div>
        );
    }
}

export default MatchesList;