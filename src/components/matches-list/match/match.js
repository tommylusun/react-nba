import React, { Component } from 'react';
import styles from './match.module.css';

class Match extends Component {

    componentDidMount() {
    }
    
    render() {
        let period = '';
        if (this.props.match.period.current===0){
            period = this.props.match.startTimeEastern;
            this.props.match.hTeam.score = '--';
            this.props.match.vTeam.score = '--';
        } else{
            period = 'P' + this.props.match.period.current + ' ' + this.props.match.clock;
        }
        let Hcolor = 'black';
        let Vcolor = 'black';
        if (this.props.match.statusNum===3){
            period = "End";
            if (Number(this.props.match.vTeam.score) < Number(this.props.match.hTeam.score)) {
                Hcolor = 'green';
            } else {
                Vcolor= 'green';
            }
        }

        return (
            <div className={[styles.container, 'innerCard', this.props.selected ? styles.selected : ''].join(' ') }>
                <div className={styles.col}>
                    <p className={styles.record}>{this.props.match.hTeam.win} - {this.props.match.hTeam.loss}</p>
                    <h4 className={styles.heading}>{this.props.match.hTeam.fullName.split(' ').pop()}</h4>
                    <div style={{color: Hcolor}} className={styles.colScoreH}>
                        <p>{this.props.match.hTeam.score}</p>
                    </div>
                </div>
                
                <div className={styles.colMid}>
                    <p>{period}</p>
                </div>
                
                <div className={styles.col}>
                    <p className={styles.record}>{this.props.match.vTeam.win} - {this.props.match.vTeam.loss}</p>
                    <h4 className={styles.heading}>{this.props.match.vTeam.fullName.split(' ').pop()}</h4>
                    <div style={{color: Vcolor}} className={styles.colScoreV}>
                        <p>{this.props.match.vTeam.score}</p>
                    </div>
                </div>
            </div>            
        );
    }
}

export default Match;