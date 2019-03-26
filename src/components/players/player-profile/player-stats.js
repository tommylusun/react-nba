import React from 'react';
import styles from './player-stats.module.css';

const PlayerStats = (props) => {

    const STAT_NAME = {
        ppg: 'Points Per Game',
        rpg: 'Rebounds Per Game',
        apg: 'Assists Per Game',
        mpg: 'Minutes Per Game',
        bpg: 'Blocks Per Game',
        topg: 'Turnovers Per Game',
        spg: 'Steals Per Game',
        fgp: 'Field Goal %',
        tpp: 'Three Point %',
        ftp: 'Free Throw %',
        pFouls: 'Total Personal Fouls',
        points: 'Total Points',
        gamesPlayed: 'Total Games Played',
        dd2: 'Double Doubles',
        td3: 'Triple Doubles'
    };
    const COLUMNS = [
        'Stat Name',
        'Career',
        '2018'
    ];

    if (props.stats.careerSummary.topg === undefined){
        props.stats.careerSummary.topg = (props.stats.careerSummary.turnovers/props.stats.careerSummary.gamesPlayed).toFixed(1);
    }

    return (
        <div className={[styles.playerStatsContainer, 'innerCard'].join(' ')}>
            {
                COLUMNS.map( columnName => {
                    let list = [];
                    
                    if (columnName === 'Stat Name'){
                        list = STAT_NAME;
                    } else if (columnName === 'Career') {
                        list = props.stats.careerSummary;
                    } else {
                        list = props.stats.latest;
                    }
                    return (
                        <div key={columnName} className={ columnName === 'Stat Name' ? styles.columnHeader : styles.column}>
                            <li className={styles.header}>
                                <label>{columnName}</label>
                            </li>
                            {
                                Object.keys(STAT_NAME).map( (stat,ind) => {
                                    let background = {};
                                    if ((ind%2)===0){
                                        background = {
                                            'background': `#00000010`
                                        }
                                    }
                                    return (
                                        <li key={stat} style={background}>
                                            <label>{list[stat]}</label>
                                        </li>
                                    );
                                })
                            }

                        </div>
                    );
                })
            }
        </div>
    );
}

export default PlayerStats;