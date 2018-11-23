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
  //https://cors.io/?
  baseURL = 'https://cors.io/?https://data.nba.net';
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
    await this.getNBAGamesToday();
    await this.getPlayers();
    await this.getTeams();

  }

  //Handle clicking on a match
  onClickHandler = async (gameId) => {
    // const dateFormatted = this.formatDate(this.date);
    // this.setState({
    //   match: "loading"
    // });
    // try {
    //   const matchDetails = await this.getGameDetails(dateFormatted,gameId);
    //   matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).fullName;
    //   matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).fullName;
    //   this.setState({
    //     match: matchDetails.data,
    //     matchId: gameId
    //   });
    // } 
    // catch (e) {
    //   console.log(e);
    // } 
  }

  dayHandler = async (offset) => {
    this.date.setDate(this.date.getDate() + offset);
    this.setState({games:null, date: this.date});
    await this.getNBAGamesToday();

  }

  async getNBAGamesToday() {
    // this.setState({games: null});
    const dateFormatted = this.formatDate(this.date);
    const res2 = await axios.get(this.baseURL + this.getDayGamesURL(dateFormatted));
    const games = await res2.data.games;
    
    this.setState({
      games: games,
    });
    return this.state;
    
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

  getTeamName(teamId) {
    return this.state.teams.find( team => team.teamId === teamId);
  }

  

  render() {
    let match = (
      <Route exact path="/matches/:date/:id" component={ (props) => 
          { return !!this.state.teams ? 
            <Grid.Column textAlign='centered' width={12} className='App-Match-Details-Container'>
            <MatchDetails 
            className='App-Match-Details-Container'
            {...props}
            players={this.state.players}
            teams={this.state.teams}
            />
            </Grid.Column> : <div></div> } 
          }/>         
      );

    let matchList = (
        <Route path="/matches" render={() => 
          <Grid.Column textAlign='centered' width={4} className='MatchesList-container'>
            <Button.Group>
              <Button onClick={() => this.dayHandler(-1)}>Prev Day</Button>
              <Button onClick={() => this.dayHandler(1)}>Next Day</Button>
            </Button.Group>
            <h1 style={{margin: '25px'}}>{this.date.toDateString()}</h1>
            <MatchesList 
              date={this.formatDate(this.date)}
              games={this.state.games}
              selected={this.onClickHandler}
              />
          </Grid.Column>
          }
        /> 
        );

    return (
      <BrowserRouter>
        <Grid className="App">
          <Grid.Row className="App-Grid-Header">
            <div className='App-Title'>
              <Link style={{ textDecoration: 'none', color: 'black'}} to={'/matches'} onClick={() => {this.setState({ match: null, matchId: null})}}>
                <h1 className='App-logo'>NBA Stats</h1>
                {/* <img src='../public/nba_logo2.png' alt="nba-logo"></img> */}
              </Link>
            </div>
          </Grid.Row>    
            
          <Grid.Row textAlign='centered' className="App-body">
            <Switch>
              <Redirect exact from="/" to="/matches" />
            </Switch>
              {matchList}
              {match}
            
        </Grid.Row>  
                      
          <div className="App-footer">
          </div>
           
        </Grid> 
      </BrowserRouter>
      
    );
  }

}

export default App;
