import React, { Component } from 'react';
import styles from './players.module.css';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
// import { Loader, Grid, Button } from 'semantic-ui-react'
// import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Players extends Component {

    state = {
        searchValue: '',
        searchedPlayers: 0
    }

    componentDidMount() {
        if (this.props.history.location.search !== '') {
            const searchString = this.props.history.location.search.substring(3);
            this.setState({searchValue: searchString});
            const list = this.getPlayers(searchString);
            this.setState({searchedPlayers: list});
        }   else {
            const list = this.getDefaultList();
            this.setState({searchedPlayers: list});
        }
    }

    onInputChange(event) {
        if (event.key === 'Enter' ){
            this.props.history.push('/app/players?s='+this.state.searchValue);
        }
    }
    componentWillReceiveProps() {
        // if (this.props.history.location.search !== this.state.searchValue) {
            const searchString = this.props.history.location.search.substring(3);
            this.setState({searchValue: searchString})
            const list = this.getPlayers(this.state.searchValue);
            this.setState({searchedPlayers: list});
        // }
    }

    getPlayers(name) {
        const list = this.props.players.filter((player) => {
            const fullName = [player.firstName, player.lastName].join(' ').toLowerCase().replace('.','');
            return fullName.includes(name.toLowerCase());
        })
        if (list.length===0){
            return -1;
        }
        return list;
    }

    getDefaultList(){
        const defaultList = this.props.players.filter( (player) => {
            const fullName = [player.firstName, player.lastName].join(' ').toLowerCase().replace('.','');
            if (fullName.includes('lebron') || 
            fullName.includes('kevin durant') || 
            fullName.includes('anthony davis') ||
            fullName.includes('stephen curry') ||
            fullName.includes('giannis ante') ||
            fullName.includes('joel embiid') ||
            fullName.includes('kawhi') ||
            fullName.includes('james harden') ||
            fullName.includes('russell westbrook') ||
            fullName.includes('kyrie irving'))
            {
                return true;
            }
            return false;
        });
        return defaultList;
    }

    render() {
        let players = null;
        let counter = (<div>Type someone's name</div>);
        if (this.state.searchedPlayers === -1){
            counter = (<div>No one has that name...</div>);
        }
        if (!!this.state.searchedPlayers && this.state.searchedPlayers.length>0){
            players = this.state.searchedPlayers.map((player) => {
                let imgsrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`
                return (
                    
                    <div key={player.personId} className={[styles.playerListItem,'innerCard'].join(' ')}>
                        <Link to={'/app/players/' + player.personId} style={{ textDecoration: 'none', color: 'black'}}>
                            <p className={styles.playerName}>{player.firstName + ' ' + player.lastName}</p>
                            <div>
                                <img style={{width: '100%'}} src={imgsrc} alt={player.lastName}/>
                            </div>
                        </Link>
                    </div>
                    
                );
            });
            counter = (<label> {this.state.searchedPlayers.length} players</label>);
        }

    

        return (
            <div className={styles.container}> 
                <Helmet>
                    <title>2019 NBA Players - Stats Simplified</title>
                </Helmet>
                <div className={[styles.playersContainer,'containerCard'].join(' ')}>
                    <h1>2018 Active Players</h1> 

                    <div className={styles.searchHeader}>
                        <input placeholder='Enter name' className={[styles.searchBar,'innerCard'].join(' ')} type='text' value={this.state.searchValue} onKeyPress={(e) => this.onInputChange(e)} onChange={(event)=> this.setState({searchValue: event.target.value})}/>
                        {/* <button>Search</button> */}
                        <div>
                            {counter}
                        </div>
                    </div>

                    <div className={styles.playersSearchContainer}>
                        {players}
                    </div>
                    
                </div>

                
            </div>);
    }
}
const mapStateToProps = state => ({
    teams: state.teams,
    players: state.players
});
export default connect(mapStateToProps)(Players);