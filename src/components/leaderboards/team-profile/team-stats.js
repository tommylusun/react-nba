import React from 'react';
import styles from './team-stats.module.css';

const TeamStats = (props) => {
    let teamStats = props.teamStats;

    return (
        <div className={styles.container}>
            
            <div className={styles.listContainer}>
                <li className={styles.header}>
                    <label>Field Goal %</label>
                    <label>Three Pt %</label>
                    <label>Free Throw %</label>
                </li>
                <li>
                    <label>{teamStats.fgp.avg}</label>
                    <label>{teamStats.tpp.avg}</label>
                    <label>{teamStats.ftp.avg}</label>                            
                </li>
            </div>
                
            
            <div className={styles.listContainer}>
                <li className={styles.header}>
                    <label>Points</label>
                    <label>Assists</label>
                    <label>Off Reb</label>
                    <label>Def Reb</label>
                </li>
                <li>
                    <label>{teamStats.ppg.avg}</label>
                    <label>{teamStats.apg.avg}</label>
                    <label>{teamStats.orpg.avg}</label>
                    <label>{teamStats.drpg.avg}</label>
                    
                </li>
            </div>

            <div className={styles.listContainer}>
                <li className={styles.header}>
                    <label>Opp Points</label>
                    <label>Turnovers</label>
                    <label>Steals</label>
                    <label>Blocks</label>
                    <label>Fouls</label>
                </li>
                <li>
                    <label>{teamStats.oppg.avg}</label>
                    <label>{teamStats.tpg.avg}</label>
                    <label>{teamStats.spg.avg}</label>
                    <label>{teamStats.bpg.avg}</label>
                    <label>{teamStats.pfpg.avg}</label>
                </li>
            </div>
        </div>);
}

export default TeamStats;