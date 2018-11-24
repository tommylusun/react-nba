import React, {
    Component
} from 'react';
import Match from './match/match';
import styles from './matches-list.module.css';
import { Loader } from 'semantic-ui-react'


class MatchesList extends Component {


    state = {selected: null};

    clickHandler = (id) => {
        this.setState({selected: id});
    }

    render() {
        const matches = this.props.games;
        if (matches===null || matches===undefined){
            return (      
                <div className={styles.divider}>
                    <Loader className='loader' size='large' active content='Fetching games...' />
                </div>
                );   
        }
        const matchesList = matches.map(match => {
            return ( 
                <div onClick={()=>this.clickHandler(match.gameId)} >
                    <Match
                    selected={this.state.selected === match.gameId ? true : false}
                    date={this.props.date}
                    match={match} 
                    key={match.gameId}/> 
                </div>
            );
        });

        if (matchesList.length===0) {
            return ( 
                <div className={styles.divider}>
                    <h3>No Games Today</h3>
                </div>
            );
        }

        return ( 
            <div>
                {matchesList} 
            </div>
            
        );
    }
}

export default MatchesList;