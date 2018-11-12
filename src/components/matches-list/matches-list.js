import React, {
    Component
} from 'react';
import Match from './match/match';
import styles from './matches-list.module.css';


class MatchesList extends Component {


    render() {
        const matches = this.props.games;
        if (matches===null || matches===undefined){
            return <div>Loading...</div>;   
        }
        const matchesList = matches.map(match => {
            return ( 
                <Match
                click={()=>this.props.selected(match.gameId)}
                match={match} 
                key={match.gameId}/> 
            );
        });


        return ( 
            <div>
                {matchesList} 
            </div>
        );
    }
}

export default MatchesList;