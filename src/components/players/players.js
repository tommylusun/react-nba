import React, { Component } from 'react';
import styles from './players.module.css';
import axios from 'axios';
import { urlConstants } from '../../constants/url-constants';

// import { Loader, Grid, Button } from 'semantic-ui-react'
// import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class Players extends Component {



    render() {

        return (
            <div className={styles.container}> 
                <div className={[styles.playersContainer,'containerCard'].join(' ')}>
                        <h1>Players</h1> 
                        <p>coming soon...</p>
                    
                </div>

                
            </div>);
    } 


}

export default Players;