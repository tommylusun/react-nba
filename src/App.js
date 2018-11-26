import React, { Component } from 'react';
import './App.css';
import { urlConstants } from './constants/url-constants';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import LeaderBoards from './components/leaderboards/leaderboards';
import axios from 'axios';
import HeaderNav from './components/header-nav/header-nav';
import { Loader, Grid, Button } from 'semantic-ui-react'
import { withRouter, BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  
  // baseURL = '/api?request=';
  baseURL = urlConstants.BASE_URL;
  getTeamsURL = urlConstants.GET_ALL_TEAMS;
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

  leaderBoards = (
    <Route exact path="/app/leaderboards" component={ props => 
      <LeaderBoards
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
              {/* <Link style={{ textDecoration: 'none', color: 'black'}} to={'/app/matches'} onClick={() => {this.setState({ match: null, matchId: null})}}> */}
                <h1 className='App-logo'>NBA Stats</h1>
              {/* </Link> */}
            </div>
          </Grid.Row>    
          <Grid.Row className='App-Navbar'>

            <div className='App-Nav'>
            <HeaderNav/>
            </div>
          </Grid.Row>
            
          <Grid.Row textAlign='centered' className="App-body">
            <Switch>
              <Redirect exact from="/" to="/app/matches" />
            </Switch>
              {this.matchList}
              {this.match}
              {this.leaderBoards}
          </Grid.Row>  

          <div className="App-footer"></div>
           
        </Grid> 
      </BrowserRouter>
    );
  }

}

export default App;
