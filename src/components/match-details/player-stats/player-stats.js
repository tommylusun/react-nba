import React, {
    Component
} from 'react';
import styles from './player-stats.module.css';
import { Table } from 'semantic-ui-react'

// import Table2 from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

class PlayerStats extends Component {


    componentDidMount() {

    }

    getMoreStats = (player) => {


    }
    renderPlayerList = () => {
        return this.props.playerList.map( player => {
            if (player.teamId === this.props.teamId){
                let playerDetails = this.props.players.find( person => person.personId === player.personId);
                if (playerDetails === undefined) {
                    playerDetails = {firstName: "Not",lastName: "Found"};
                }
                
                return (
                    <li>
                        <label>{player.pos}</label>
                        <label className={styles.players}>{playerDetails.firstName} {playerDetails.lastName}</label>
                        <label>{player.points}</label>
                        <label>{player.assists}</label>
                        <label>{player.totReb}</label>
                        <label>{player.min}</label>
                    </li>);
            }
            
        });
    }
    
    render() {
        return (
            <div className={styles.PlayersTable}>
                <ul>
                    <li className={styles.header}>
                        <label><b>Pos</b></label>
                        <label className={styles.players}><b>Player</b></label>
                        <label><b>Pts</b></label>
                        <label><b>Ast</b></label>
                        <label><b>Reb</b></label>
                        <label><b>Minutes</b></label>
                    </li>
                    {this.renderPlayerList()}
                </ul>
            </div>

        );
    }
}

export default PlayerStats;

                    // <Table.Row>
                    //     <Table.Cell>{player.pos}</Table.Cell>
                    //     <Table.Cell singleLine>{playerDetails.firstName} {playerDetails.lastName}</Table.Cell>
                    //     <Table.Cell>{player.points}</Table.Cell>
                    //     <Table.Cell>{player.assists}</Table.Cell>
                    //     <Table.Cell>{player.totReb}</Table.Cell>
                    //     <Table.Cell>{player.min}</Table.Cell>
                    // </Table.Row>);

            // <Table sortable selectable size='small'>
                
            //     <Table.Header>
            //         <Table.Row>
            //             <Table.Cell><b>Pos</b></Table.Cell>
            //             <Table.Cell><b>Player</b></Table.Cell>
            //             <Table.Cell><b>Pts</b></Table.Cell>
            //             <Table.Cell><b>Ast</b></Table.Cell>
            //             <Table.Cell><b>Reb</b></Table.Cell>
            //             <Table.Cell><b>Minutes</b></Table.Cell>
            //         </Table.Row>
            //     </Table.Header>
                
            //     <Table.Body className={styles['table-body']}>
            //         {this.renderPlayerList()}
            //     </Table.Body>
                
                
            // </Table>