import React, { Component } from 'react';
import styles from './team-profile.module.css';
import axios from 'axios';
import { urlConstants } from '../../../constants/url-constants';

import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class TeamStats extends Component {

    async componentDidMount() {

    }

    

    render() {
        let teamStats = this.props.teamStats;

        return (
            <div className={styles.container}>
                Team Stats 
                <ul>
                    <li>
                        <label>Field Goal %</label>
                        <label>Field Goal %</label>
                        <label>Field Goal %</label>
                        <label>Field Goal %</label>
                        <label>Field Goal %</label>
                        <label>Field Goal %</label>
                    </li>
                </ul>     
                <ul>
                </ul>    
            </div>);
    }
}

export default TeamStats;