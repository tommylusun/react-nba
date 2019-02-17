import React from 'react';
import styles from './game-stats.module.css';
import { Grid } from 'semantic-ui-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { urlConstants } from '../../../utils/url-constants';
import { Link } from 'react-router-dom';


const GameStats = (props) => {
    const data = props.stats;   
    const background = { 
        background: `linear-gradient(90deg, ${props.team1Color}a0 25%, ${props.team2Color}a0 75%)`,
    };
    let currentPeriodString = null;
    let progressBar = <LinearProgress className={styles.livebar}/>;
    if (data === undefined){
        return null;
    }
    let table = null;
    if (data.hTeam.linescore.length !== 0 && data.vTeam.linescore.length !== 0){
        table = (
            <div className={styles.GameScoreSummary}>
                <ul>
                    <li className={styles.header}>
                        <label className={styles.teamName}><b>Team</b></label>
                        <label><b>P1</b></label>
                        <label><b>P2</b></label>
                        <label><b>P3</b></label>
                        <label><b>P4</b></label>
                        <label><b>Total</b></label>
                    </li>
                    <li>
                        
                        <label className={styles.teamName}>
                            <Link to={'/app/leaderboards/' + data.hTeam.teamId}>
                                {data.hTeam.fullName}
                            </Link>
                        </label>
                        
                        
                        <label>{data.hTeam.linescore[0].score}</label>
                        <label>{data.hTeam.linescore[1].score}</label>
                        <label>{data.hTeam.linescore[2].score}</label>
                        <label>{data.hTeam.linescore[3].score}</label>
                        <label>{data.hTeam.score}</label>
                    </li>
                    <li>
                        <label className={styles.teamName}>
                            <Link to={'/app/leaderboards/' + data.hTeam.teamId}>
                            {data.vTeam.fullName}
                            </Link>
                        </label>
                        <label>{data.vTeam.linescore[0].score}</label>
                        <label>{data.vTeam.linescore[1].score}</label>
                        <label>{data.vTeam.linescore[2].score}</label>
                        <label>{data.vTeam.linescore[3].score}</label>
                        <label>{data.vTeam.score}</label>
                    </li>
                </ul>
            </div>
        );
        
        if (data.period.isEndOfPeriod){
            data.clock = 'End of period '+ data.period.current;
        }
        if (data.clock==='' || data.clock === undefined) {
            data.clock = '--';
        } else {
            currentPeriodString = (<p>Period: {data.period.current}</p>);
        }
        if (data.statusNum === 3){
            data.clock = 'Final';
            progressBar = null;
            currentPeriodString = null;
        }
    }
    return (
        <div className={styles.container}>
            <Grid textAlign="center">
                <Grid.Row>
                    
                    <Grid.Column width={6} className={styles.teamName}>
                        <h1 className={styles.headerTeamName}>{data.hTeam.fullName}</h1>
                    </Grid.Column>
                    
                    <Grid.Column width={4} verticalAlign="middle" className={styles.middleCol}>
                        <h3>{data.clock}</h3>
                        {currentPeriodString}
                    </Grid.Column>

                    <Grid.Column width={6} className={styles.teamName}>
                        <h1 className={styles.headerTeamName}>{data.vTeam.fullName}</h1>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row style={background}>
                    <Grid.Column width={4}>
                        <div>
                            <img className={styles.image} src={urlConstants.GET_TEAM_LOGO(data.hTeam.triCode)} alt=" "></img>
                        </div>
                        <p><b>{data.hTeam.win} - {data.hTeam.loss}</b></p>
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign="middle">
                        <h2 className={styles.score}> {data.hTeam.score}</h2>
                    </Grid.Column>

                    <Grid.Column width={2} verticalAlign="middle" className={styles.middleCol}>
                        <h1>-</h1>
                    </Grid.Column>

                    <Grid.Column width={2} verticalAlign="middle">
                        <h2 className={styles.score}>{data.vTeam.score}</h2>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div>
                            <img className={styles.image} src={urlConstants.GET_TEAM_LOGO(data.vTeam.triCode)} alt=" "></img>
                        </div>
                        <p><b>{data.vTeam.win} - {data.vTeam.loss}</b></p>
                    </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row>
                    <div>{data.nugget.text}</div>
                </Grid.Row> */}

                <Grid.Row centered>
                        {table}
                </Grid.Row>                  
            </Grid>
            <div className={styles.bar}>
                {progressBar}                
            </div>
        </div>
        
    );
}

export default GameStats;