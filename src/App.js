import React, { Component } from 'react';
// import logo from './logo.svg';
import nbalogo from './nba-icon.jpg';
import './App.css';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import axios from 'axios';
import { Loader, Grid, Button } from 'semantic-ui-react'
import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class App extends Component {
  
  baseURL = '/api?request=';
  // baseURL = 'https://data.nba.net';
  getTeamsURL = '/prod/v2/2018/teams.json';
  getPlayersURL = '/prod/v1/2018/players.json';
  
  formatDate = date => date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
  getDayGamesURL = formattedDate => `/prod/v2/${formattedDate}/scoreboard.json`;

  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      games: [],
      teams: null,  
      match: null,
      players: null
    };
  }

  async componentDidMount() {
    this.setState({games: null, date: this.date});
    await this.getPlayers();
    await this.getTeams();
  }


  async getPlayers() {
    const res3 = await axios.get(this.baseURL + this.getPlayersURL);
    const players = await res3.data.league.standard;
    this.setState({
      players: players,
    });
    return this.state;
  }

  async getTeams() {
    const res = await axios.get(this.baseURL + this.getTeamsURL);
    const teams = await res.data.league.standard;
    this.setState({
      teams: teams,
    });
    return this.state;
  }

  match = (
    <Route exact path="/app/matches/:date/:id" component={ (props) => 
          <Grid.Column textAlign='centered' width={12} className='App-Match-Details-Container'>
            <MatchDetails 
            className='App-Match-Details-Container'
            {...props}
            players={this.state.players}
            teams={this.state.teams}
            />
          </Grid.Column>
        }/>
  );

  matchList = (
    <Route path="/app/matches" render={() => 
      <Grid.Column textAlign='centered' width={4} className='MatchesList-container'>
        <MatchesList/>
      </Grid.Column>
      }/> 
  );

  render() { 
    if (this.state.teams === null){
      return null;
    }
    return (
      <BrowserRouter>
        <Grid className="App">
          <Grid.Row className="App-Grid-Header">
            <div className='App-Title'>
              <Link style={{ textDecoration: 'none', color: 'black'}} to={'/app/matches'} onClick={() => {this.setState({ match: null, matchId: null})}}>
                <h1 className='App-logo'>NBA Stats</h1>
              </Link>
            </div>
          </Grid.Row>    
            
          <Grid.Row textAlign='centered' className="App-body">
            <Switch>
              <Redirect exact from="/" to="/app/matches" />
            </Switch>
              {this.matchList}
              {this.match}
          </Grid.Row>  

          <div className="App-footer"></div>
           
        </Grid> 
      </BrowserRouter>
    );
  }

}

export default App;
