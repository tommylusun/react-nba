import React, { Component } from 'react';
import styles from './match.module.css';
import { Link } from 'react-router-dom';

class Match extends Component {


    // constructor(props){
    //     super(props);
    //     this.props = props;
    // }

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

        if (this.props.match.statusNum===3){
            period = "End";
            // if (this.props.match.hTeam.score < this.props.match.vTeam.score) {
            //     styles.colScoreH = {
            //         fontSize: '600'
            //     }
            // } else {
            //     styles.colScoreV = {
            //         fontSize: '600'
            //     }
            // }
        }
        console.log(this.props.selected);


        return (
            
            <Link to={'/app/matches/' + this.props.date + '/' + this.props.match.gameId} style={{ textDecoration: 'none', color: 'black'}}>
                <div className={[styles.container, this.props.selected ? styles.selected : ''].join(' ') }>
                    <div className={styles.col}>
                        <p className={styles.record}>{this.props.match.hTeam.win} - {this.props.match.hTeam.loss}</p>
                        <h4 className={styles.heading}>{this.props.match.hTeam.triCode}</h4>
                    </div>
                    <div className={styles.colScoreH}>
                        <p>{this.props.match.hTeam.score}</p>
                    </div>
                    <div className={styles.colMid}>
                        <p>{period}</p>
                    </div>
                    <div className={styles.colScoreV}>
                        <p>{this.props.match.vTeam.score}</p>
                    </div>
                    <div className={styles.col}>
                        <p className={styles.record}>{this.props.match.vTeam.win} - {this.props.match.vTeam.loss}</p>
                        <h4 className={styles.heading}>{this.props.match.vTeam.triCode}</h4>
                    </div>
                </div>
            </Link>
            
        );
    }
}

export default Match;