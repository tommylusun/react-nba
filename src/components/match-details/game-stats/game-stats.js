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
                        <Table.Cell>Team</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>3</Table.Cell>
                        <Table.Cell>4</Table.Cell>
                        <Table.Cell>Total</Table.Cell>
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
                    {/* <Grid.Row>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </Grid.Row> */}
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <img src={this.url(this.data.hTeam.triCode)} alt="team"></img>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <h1>{this.data.hTeam.fullName}</h1>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <h2>{this.data.hTeam.score}</h2>
                        </Grid.Column>
                        <Grid.Column width={4} className={styles.middleCol}>
                            <h1>{this.data.clock}</h1>
                            {this.currentPeriodString}

                        </Grid.Column>
                        <Grid.Column width={1}>
                            <h2>{this.data.vTeam.score}</h2>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <h1>{this.data.vTeam.fullName}</h1>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <img src={this.url(this.data.vTeam.triCode)} alt="team"></img>
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