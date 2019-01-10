import React, { Component } from 'react';
import styles from './players-profile.module.css';
import {Helmet} from "react-helmet";

// import { Loader, Grid, Button } from 'semantic-ui-react'
// import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class PlayerProfile extends Component {

    state = {
        personId: 0,
        playerDetails: {}
    }

    async componentDidMount() {
        await this.setState({personId: this.props.match.params.personId});
        let playerDetails = await this.props.players.find( person => person.personId === this.state.personId);
        this.setState({playerDetails: playerDetails});
    }

    componentWillReceiveProps() {
    }
    onInputChange(event) {
        if (event.key === 'Enter' ){
            // const list = this.getPlayers(this.state.searchValue);
            // this.setState({searchedPlayers : list});
            this.props.history.push('/app/players?s='+this.state.searchValue);
        }
    }

    render() {
        let imgsrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.personId}.png`
        let player = this.state.playerDetails;

        return (
            <div className={styles.container}> 
                <Helmet>
                    <title>{`${player.firstName}`} {`${player.lastName}`} - 2018 2019 NBA season player profile</title>
                </Helmet>
                <div className={[styles.playersContainer,'containerCard'].join(' ')}>
                    <h1>2018 Active Players</h1> 

                    <div className={styles.searchHeader}>
                        <input placeholder='Enter name' className={[styles.searchBar,'innerCard'].join(' ')} type='text' value={this.state.searchValue} onKeyPress={(e) => this.onInputChange(e)} onChange={(event)=> this.setState({searchValue: event.target.value})}/>
                    </div>

                    <div className={styles.playersSearchContainer}>
                    
                        <div>
                            <img src={imgsrc} alt={this.state.personId}/>
                        </div>
                        <div>
                            <h2>{player.firstName} {player.lastName}</h2> 
                            <p>Coming soon...</p>
                        </div>
                        
                    </div>
                </div>
            </div>);
    } 


}

export default PlayerProfile;