import React, { Component } from 'react';
import "@babel/polyfill";
import './App.css';
import { urlConstants } from './utils/url-constants';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import LeaderBoards from './components/leaderboards/leaderboards';
import HomePage from './components/homepage/homepage';
import Players from './components/players/players';
import PlayerProfile from './components/players/player-profile';
import axios from 'axios';
import HeaderNav from './components/header-nav/header-nav';
import { Grid } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTeams,addPlayers } from './actions';

// function to convert the global state obtained from redux to local props
function mapDispatchToProps(dispatch) {
  return {
    addTeams: teams => {
      dispatch(addTeams(teams));
    },
    addPlayers: players => {
      dispatch(addPlayers(players));
    }
  };
}
class App extends Component {
  
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
    this.props.addPlayers(players);
    return this.state;
  }

  async getTeams() {
    const res = await axios.get(this.baseURL + this.getTeamsURL);
    const teams = await res.data.league.standard;
    this.setState({
      teams: teams,
    });
    this.props.addTeams(teams);
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
            />
          </Grid.Column>
        }/>
  );

  matchList = (
    <Route path="/app/matches" render={(props) => 
      <Grid.Column className='MatchesList-container'>
        <MatchesList {...props}/>
      </Grid.Column>
      }/> 
  );

  leaderBoards = (
    <Route path="/app/leaderboards" component={ props => 
      <LeaderBoards
      {...props}
      />
    }/>
  );

  playersTab = (
    <Route exact path="/app/players" component={ props => 
      <Players
      {...props}
      />
    }/>
  );

  playerProfile = (
    <Route exact path="/app/players/:personId" component={ props => 
      <PlayerProfile
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
                <h1 className='App-logo'>2019 NBA Stats</h1>
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
              {this.playerProfile}
          </Grid.Row>  

          <div className="App-footer"></div>
           
        </Grid> 
      </BrowserRouter>
    );
  }

}
const ExportApp = connect(null,mapDispatchToProps)(App);
export default ExportApp;
