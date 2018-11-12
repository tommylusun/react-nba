import React, {
    Component
} from 'react';
import styles from './game-stats.module.css';
import { Table, Grid } from 'semantic-ui-react'
import LinearProgress from '@material-ui/core/LinearProgress';


class GameStats extends Component {


    componentDidMount() {
        this.data = this.props.stats;   
    }

    
    
    render() {

        this.currentPeriodString = '';
        this.progressBar = <LinearProgress className={styles.livebar}/>;
        this.data = this.props.stats;
        console.log(this.props.stats);
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
                    <Table.Cell>{this.data.hTeam.triCode}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[0].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[1].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[2].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.linescore[3].score}</Table.Cell>
                        <Table.Cell>{this.data.hTeam.score}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>{this.data.vTeam.triCode}</Table.Cell>
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
                this.currentPeriodString = 'Period: ' + this.data.period.current;
            }
            if (this.data.statusNum === 3){
                this.data.clock = 'Final';
                this.progressBar = null;
            }
            
        }
        console.log(this.progressBar);
        return (
            <div className={styles.container}>
                <Grid>
                    {/* <Grid.Row>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </Grid.Row> */}
                    <Grid.Row columns={5}>
                        <Grid.Column>
                            <h1>{this.data.hTeam.triCode}</h1>
                        </Grid.Column>
                        <Grid.Column>
                            <h2>{this.data.hTeam.score}</h2>
                        </Grid.Column>
                        <Grid.Column className={styles.middleCol}>
                            <h1>{this.data.clock}</h1>
                            <p>{this.currentPeriodString}</p>

                        </Grid.Column>
                        <Grid.Column>
                            <h2>{this.data.vTeam.score}</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <h1>{this.data.vTeam.triCode}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    {/* <Grid.Row>
                        <div>{this.data.nugget.text}</div>
                    </Grid.Row> */}

                    <Grid.Row>
                        {this.table}
                    </Grid.Row>
                </Grid>
                {this.progressBar}                
            </div>
            
        );
        
    }
}

export default GameStats;