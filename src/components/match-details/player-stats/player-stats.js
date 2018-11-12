import React, {
    Component
} from 'react';
import styles from './player-stats.module.css';
import { Table } from 'semantic-ui-react'


class PlayerStats extends Component {


    componentDidMount() {

    }

    getMoreStats = (player) => {


    }
    renderPlayerList = () => {
        return this.props.playerList.map( player => {
            if (player.teamId === this.props.teamId){
                const playerDetails = this.props.players.find( person => person.personId === player.personId);
                return (
                    <Table.Row>
                        <Table.Cell>{player.pos}</Table.Cell>
                        <Table.Cell singleLine>{playerDetails.firstName[0]}. {playerDetails.lastName}</Table.Cell>
                        <Table.Cell>{player.points}</Table.Cell>
                        <Table.Cell>{player.assists}</Table.Cell>
                        <Table.Cell>{player.totReb}</Table.Cell>
                        <Table.Cell>{player.min}</Table.Cell>
                    </Table.Row>);
            }
            
        });
    }
    
    render() {
        return (
            <Table sortable selectable size='small'>
                
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>Position</Table.Cell>
                        <Table.Cell>Player</Table.Cell>
                        <Table.Cell>Points</Table.Cell>
                        <Table.Cell>Assists</Table.Cell>
                        <Table.Cell>Rebounds</Table.Cell>
                        <Table.Cell>Minutes</Table.Cell>
                    </Table.Row>
                </Table.Header>
                
                <Table.Body className={styles['table-body']}>
                    {this.renderPlayerList()}
                </Table.Body>
                
                
            </Table>
        );
    }
}

export default PlayerStats;