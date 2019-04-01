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
import { addTeams, addPlayers } from './actions';

class App extends Component {

  baseURL = urlConstants.BASE_URL;
  getTeamsURL = urlConstants.GET_ALL_TEAMS;
  getPlayersURL = urlConstants.GET_ALL_PLAYERS;

  async componentDidMount() {
    await this.getPlayers();
    await this.getTeams();
  }

  async getPlayers() {
    const res = await axios.get(this.baseURL + this.getPlayersURL);
    const players = await res.data.league.standard;
    this.props.addPlayers(players);
  }

  async getTeams() {
    const res = await axios.get(this.baseURL + this.getTeamsURL);
    const teams = await res.data.league.standard;
    this.props.addTeams(teams);
  }

  homePage = (
    <Route exact path="/" component={(props) =>
      <HomePage />
    } />
  );

  matches = (
    <Route path="/app/matches" render={(props) =>
      <>
        <Grid.Column className='MatchesList-container'>
          <MatchesList {...props} />
        </Grid.Column>

        <Route exact path="/app/matches/:date/:id" component={(props) =>
          <Grid.Column className='App-Match-Details-Container'>
            <MatchDetails
              className='App-Match-Details-Container'
              {...props}
            />
          </Grid.Column>
        } />
      </>
    } />
  );

  leaderBoards = (
    <Route path="/app/leaderboards" component={props =>
      <LeaderBoards
        {...props}
      />
    } />
  );

  playersTab = (
    <Route exact path="/app/players" component={props =>
      <Players
        {...props}
      />
    } />
  );

  playerProfile = (
    <Route exact path="/app/players/:personId" component={props =>
      <PlayerProfile
        {...props}
      />
    } />
  );

  render() {
    if (this.props.teams === null || this.props.players === null) {
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
            <HeaderNav />
          </Grid.Row>

          <Grid.Row centered className="App-body">
            <Switch>
              {this.matches}
              {this.leaderBoards}
              {/* {this.homePage} */}
              {this.playersTab}
              {this.playerProfile}
              <Redirect exact from="*" to="/app/matches" />
            </Switch>
          </Grid.Row>

          <div className="App-footer"></div>

        </Grid>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  teams: state.teams,
  players: state.players
});
const mapDispatchToProps = dispatch => {
  return {
    addTeams: teams => {
      dispatch(addTeams(teams));
    },
    addPlayers: players => {
      dispatch(addPlayers(players));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);