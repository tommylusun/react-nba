import React, { Component } from 'react';
// import logo from './logo.svg';
import nbalogo from './nba-icon.jpg';
import './App.css';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import axios from 'axios';
import { Loader, Grid, Button } from 'semantic-ui-react'

class App extends Component {
  //https://cors.io/?
  baseURL = 'https://cors.io/?https://data.nba.net';
  getTeamsURL = '/prod/v2/2018/teams.json';
  getPlayersURL = '/prod/v1/2018/players.json';
  
  formatDate = date => date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
  getDayGamesURL = formattedDate => `/prod/v2/${formattedDate}/scoreboard.json`;
  getGameDetailsURL = (formattedDate, gameId) => `/prod/v1/${formattedDate}/${gameId}_boxscore.json`;

  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      games: [],
      teams: [],
      match: null
    };
  }

  async componentDidMount() {
    this.setState({games: null});
    await this.getNBAGamesToday();
    await this.getPlayers();
    await this.getTeams();
    // Refresh the data every 10 seconds
    this.interval = setInterval(async () => {
      await this.getNBAGamesToday();
      if (this.state.matchId){
        const matchDetails = await this.getGameDetails(this.formatDate(this.date),this.state.matchId);
        matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).fullName;
        matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).fullName;
        this.setState({
          match: matchDetails.data
        });
      }
    }, 10000);
  }

  //Handle clicking on a match
  onClickHandler = async (gameId) => {
    const dateFormatted = this.formatDate(this.date);
    this.setState({
      match: "loading"
    });
    try {
      const matchDetails = await this.getGameDetails(dateFormatted,gameId);
      matchDetails.data.basicGameData.vTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId).fullName;
      matchDetails.data.basicGameData.hTeam['fullName'] = this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId).fullName;
      this.setState({
        match: matchDetails.data,
        matchId: gameId
      });
    } 
    catch (e) {
      console.log(e);
    } 
  }

  dayHandler = async (offset) => {
    this.date.setDate(this.date.getDate() + offset);
    this.setState({games:null});
    await this.getNBAGamesToday();

  }

  async getGameDetails(date, gameId) {
    return await axios.get(this.baseURL + this.getGameDetailsURL(date,gameId));
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
    let match = null;
    let matchList = null;

    // Get list of games, or show loading
    if (this.state.games===null){
      matchList = (
      <div className='divider'>
        <Loader className='loader' size='large' active content='Fetching games...' />
        </div>);
    } else {
      matchList = (
        <MatchesList 
        games={this.state.games}
        selected={this.onClickHandler}/>);
    }
    // Show match details if available
    if (this.state.match !== null){
      match = (
      <Grid.Column textAlign='centered' width={12} >
        <MatchDetails className='App-Match-Details-Container'
        match={this.state.match}
        players={this.state.players}
        
        ></MatchDetails>
      </Grid.Column>);
    }

    return (
      <Grid centered className="App">
        <Grid.Row divided className="App-Grid-Header">
          <img src={nbalogo} className="App-logo" alt="logo" />
        </Grid.Row>
        <Grid.Row textAlign='centered' className="App-body">
          <Grid.Column textAlign='centered' width={4} className='MatchesList-container'>
            <Button.Group>
              <Button onClick={() => this.dayHandler(-1)}>Prev Day</Button>
              <Button onClick={() => this.dayHandler(1)}>Next Day</Button>
            </Button.Group>
            <h1 style={{margin: '25px'}}>{this.date.toDateString()}</h1>
            {matchList}
          </Grid.Column>
          {match}
        </Grid.Row>    
      </Grid> 
    );
  }

}

export default App;
