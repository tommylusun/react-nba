import React, { Component } from 'react';
import styles from './match.module.css';

class Match extends Component {


    // constructor(props){
    //     super(props);
    //     this.props = props;
    // }




    render() {
        let period = '';
        if (this.props.match.period.current===0){
            period = this.props.match.startTimeEastern;
            this.props.match.hTeam.score = '--';
            this.props.match.vTeam.score = '--';
        } else{
            period = 'P' + this.props.match.period.current + ' ' + this.props.match.clock;
        }

        if (this.props.match.statusNum===3){
            period = "End";
        }

        return (
            <div onClick={this.props.click} className={styles.container}>
            <div className={styles.col}>
                <h5 className={styles.heading}>{this.props.match.hTeam.win} - {this.props.match.hTeam.loss}</h5>
                <h2 className={styles.heading}>{this.props.match.hTeam.triCode}</h2>
                <p>{this.props.match.hTeam.score}</p>
            </div>
            <div className={styles.col}>
                <h5 className={styles.heading}>{this.props.match.vTeam.win} - {this.props.match.vTeam.loss}</h5>
                <h2 className={styles.heading}>{this.props.match.vTeam.triCode}</h2>
                <p>{this.props.match.vTeam.score}</p>
            </div>
            <div className={styles.col}>
                <label>{period}</label>
            </div>
                
            </div>
        );
    }
}

export default Match;