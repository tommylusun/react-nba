import React from 'react';
import styles from './match.module.css';

const Match = (props) => {
    let period = '';
    if (props.match.period.current===0){
        period = props.match.startTimeEastern;
        props.match.hTeam.score = '--';
        props.match.vTeam.score = '--';
    } else{
        period = 'P' + props.match.period.current + ' ' + props.match.clock;
    }
    let Hcolor = 'black';
    let Vcolor = 'black';
    if (props.match.statusNum===3){
        period = "End";
        if (Number(props.match.vTeam.score) < Number(props.match.hTeam.score)) {
            Hcolor = 'green';
        } else {
            Vcolor= 'green';
        }
    }

    return (
        <div className={[styles.container, 'innerCard', props.selected ? styles.selected : ''].join(' ') }>
            <div className={styles.col}>
                <p className={styles.record}>{props.match.hTeam.win} - {props.match.hTeam.loss}</p>
                <h4 className={styles.heading}>{props.match.hTeam.city ? props.match.hTeam.city : ''}</h4>
                <div style={{color: Hcolor}} className={styles.colScoreH}>
                    <p>{props.match.hTeam.score}</p>
                </div>
            </div>
            
            <div className={styles.colMid}>
                <p>{period}</p>
            </div>
            
            <div className={styles.col}>
                <p className={styles.record}>{props.match.vTeam.win} - {props.match.vTeam.loss}</p>
                <h4 className={styles.heading}>{props.match.vTeam.city ? props.match.vTeam.city : ''}</h4>
                <div style={{color: Vcolor}} className={styles.colScoreV}>
                    <p>{props.match.vTeam.score}</p>
                </div>
            </div>
        </div>            
    );
}

export default Match;