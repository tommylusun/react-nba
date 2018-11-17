import React, {
    Component
} from 'react';
import styles from './game-stats.module.css';
import { Table, Grid } from 'semantic-ui-react'
import LinearProgress from '@material-ui/core/LinearProgress';


class GameStats extends Component {

    url = (tricode) => `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${tricode.toLowerCase()}.png`;

    componentDidMount() {
        this.data = this.props.stats;   
    }

    render() {

        this.currentPeriodString = null;
        this.progressBar = <LinearProgress className={styles.livebar}/>;
        this.data = this.props.stats;
        if (this.data === undefined){
            return null;
        }
        
        if (this.data.hTeam.linescore.length === 0 || this.data.vTeam.linescore.length === 0){
            this.table = null;
        } else {
            this.table = (<Table className={styles.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell><b>Team</b></Table.Cell>
                        <Table.Cell><b>P1</b></Table.Cell>
                        <Table.Cell><b>P2</b></Table.Cell>
                        <Table.Cell><b>P3</b></Table.Cell>
                        <Table.Cell><b>P4</b></Table.Cell>
                        <Table.Cell><b>Total</b></Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>{this.data.hTeam.fullName}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[0].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[1].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[2].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[3].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.score}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>{this.data.vTeam.fullName}</Table.Cell>
                        <Table.Cell>{this.data.vTeam.linescore[0].score}</Table.Cell>
                        <Table.Cell>{this.data.vTeam.linescore[1].score}</Table.Cell>
                        <Table.Cell>{this.data.vTeam.linescore[2].score}</Table.Cell>
                        <Table.Cell>{this.data.vTeam.linescore[3].score}</Table.Cell>
                        <Table.Cell>{this.data.vTeam.score}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>);
            
            if (this.data.period.isEndOfPeriod){
                this.data.clock = 'End of period '+ this.data.period.current;
            }
            if (this.data.clock==='' || this.data.clock === undefined) {
                this.data.clock = '--';
            } else {
                this.currentPeriodString = (<p>Period: {this.data.period.current}</p>);
            }
            if (this.data.statusNum === 3){
                this.data.clock = 'Final';
                this.progressBar = null;
                this.currentPeriodString = null;
            }
            
        }
        return (
            <div className={styles.container}>
                <Grid textAlign="center">
                    <Grid.Row>
                        
                        <Grid.Column width={6} className={styles.teamName}>
                            <h1>{this.data.hTeam.fullName}</h1>
                        </Grid.Column>
                        
                        <Grid.Column width={4} verticalAlign="middle" className={styles.middleCol}>
                            <h3>{this.data.clock}</h3>
                            {this.currentPeriodString}
                        </Grid.Column>

                        <Grid.Column width={6} className={styles.teamName}>
                            <h1>{this.data.vTeam.fullName}</h1>
                        </Grid.Column>
                        
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={4}>
                            <img className={styles.image} src={this.url(this.data.hTeam.triCode)} alt="team"></img>
                            <p><b>{this.data.hTeam.win} - {this.data.hTeam.loss}</b></p>
                        </Grid.Column>
                        <Grid.Column width={2} verticalAlign="middle">
                            <h1 className={styles.score}> {this.data.hTeam.score}</h1>
                        </Grid.Column>

                        <Grid.Column width={2} verticalAlign="middle" className={styles.middleCol}>
                            <h1>-</h1>
                        </Grid.Column>

                        <Grid.Column width={2} verticalAlign="middle">
                            <h1 className={styles.score}>{this.data.vTeam.score}</h1>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <img className={styles.image} src={this.url(this.data.vTeam.triCode)} alt="team"></img>
                            <p><b>{this.data.vTeam.win} - {this.data.vTeam.loss}</b></p>
                        </Grid.Column>
                    </Grid.Row>
                    {/* <Grid.Row>
                        <div>{this.data.nugget.text}</div>
                    </Grid.Row> */}

                    <Grid.Row textAlign="center">
                        <Grid.Column width={8} textAlign="center">
                            {this.table}
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
                <div className={styles.bar}>
                    {this.progressBar}                

                </div>
            </div>
            
        );
        
    }
}

export default GameStats;