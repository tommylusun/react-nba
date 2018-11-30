import React, { Component } from 'react';
import './App.css';
import { urlConstants } from './constants/url-constants';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import LeaderBoards from './components/leaderboards/leaderboards';
import HomePage from './components/homepage/homepage';
import Players from './components/players/players';
import axios from 'axios';
import HeaderNav from './components/header-nav/header-nav';
import { Grid } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  
  baseURL = urlConstants.BASE_URL;
  getTeamsURL = urlConstants.GET_ALL_TEAMS_V2;
  getPlayersURL = urlConstants.GET_ALL_PLAYERS;

  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      games: [],
      teams: null,  
      match: null,
      players: null,
      value: 0
    };
  }

  async componentDidMount() {
    this.setState({games: null, date: this.date});
    await this.getPlayers();
    await this.getTeams();
  }


  async getPlayers() {
    const res = await axios.get(this.baseURL + this.getPlayersURL);
    const players = await res.data.league.standard;
    this.setState({
      players: players,
    });
    return this.state;
  }

  async getTeams() {
    const res = await axios.get(this.baseURL + this.getTeamsURL);
    const teams = await res.data.teams.config;
    this.setState({
      teams: teams,
    });
    return this.state;
  }

  homePage = (
    <Route exact path="/" component={ (props) => 
      <HomePage/>
    } />
  );

  match = (
    <Route exact path="/app/matches/:date/:id" component={ (props) => 
          <Grid.Column className='App-Match-Details-Container'>
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
      <Grid.Column className='MatchesList-container'>
        <MatchesList/>
      </Grid.Column>
      }/> 
  );

  leaderBoards = (
    <Route path="/app/leaderboards" component={ props => 
      <LeaderBoards
      teams={this.state.teams}
      players={this.state.players}
      {...props}
      />
    }/>
  );

  playersTab = (
    <Route exact path="/app/players" component={ props => 
      <Players
      teams={this.state.teams}
      players={this.state.players}
      {...props}
      />
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
                <h1 className='App-logo'>NBA Stats</h1>
            </div>
          </Grid.Row>    
          <Grid.Row className='App-Navbar'>
            <HeaderNav/>
          </Grid.Row>
            
          <Grid.Row centered className="App-body">
            <Switch>
              <Redirect exact from="/" to="/app/matches" />
            </Switch>
              {this.matchList}
              {this.match}
              {this.leaderBoards}
              {this.homePage}
              {this.playersTab}
          </Grid.Row>  

          <div className="App-footer"></div>
           
        </Grid> 
      </BrowserRouter>
    );
  }

}

export default App;
