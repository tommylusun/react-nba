import React, { Component } from 'react';
import styles from './players.module.css';
import axios from 'axios';
import { urlConstants } from '../../constants/url-constants';

// import { Loader, Grid, Button } from 'semantic-ui-react'
// import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class PlayerProfile extends Component {

    state = {
        searchValue: '',
        searchedPlayers: 0
    }

    componentDidMount() {
        // if (this.props.history.location.search !== '') {
        //     const searchString = this.props.history.location.search.substring(3);
        //     this.setState({searchValue: searchString});
        //     const list = this.getPlayers(searchString);
        //     this.setState({searchedPlayers: list});
        // }   else {
        //     console.log('yes');
        //     const list = this.getDefaultList();
        //     this.setState({searchedPlayers: list});
        // }
    }

    onInputChange(event) {
        if (event.key === 'Enter' ){
            const list = this.getPlayers(this.state.searchValue);
            this.setState({searchedPlayers : list});
            this.props.history.push('/app/players?s='+this.state.searchValue);
        }
    }
    componentWillReceiveProps() {
        // if (this.props.history.location.search !== this.state.searchValue) {
            // const searchString = this.props.history.location.search.substring(3);
            // this.setState({searchValue: searchString})
            // const list = this.getPlayers(this.state.searchValue);
            // this.setState({searchedPlayers: list});
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

    render() {

    

        return (
            <div className={styles.container}> 
                <div className={[styles.playersContainer,'containerCard'].join(' ')}>
                    <h1>2018 Active Players</h1> 

                    <div className={styles.searchHeader}>
                        <input placeholder='Enter name' className={[styles.searchBar,'innerCard'].join(' ')} type='text' value={this.state.searchValue} onKeyPress={(e) => this.onInputChange(e)} onChange={(event)=> this.setState({searchValue: event.target.value})}/>
                    </div>

                    <div className={styles.playersSearchContainer}>
                        Hi
                    </div>
                </div>
            </div>);
    } 


}

export default PlayerProfile;