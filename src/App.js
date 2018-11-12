import React, { Component } from 'react';
// import logo from './logo.svg';
import nbalogo from './nba-icon.jpg';
import './App.css';
import MatchDetails from './components/match-details/match-details';
import MatchesList from './components/matches-list/matches-list';
import axios from 'axios';
import { Loader, Grid } from 'semantic-ui-react'

class App extends Component {


  // https://stats.nba.com/stats/scoreboard/?GameDate=10/28/2018&LeagueID=00&DayOffset=0
  // https://stats.nba.com/stats/boxscoreplayertrackv2/?GameID=0021800083
  // https://stats.nba.com/stats/boxscoresummaryv2/?GameID=0021800083

  // Stats version 2

  baseURL = 'https://data.nba.net';
  
  formatDate = date => date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2);
  getDayGamesURL = formattedDate => `/prod/v2/${formattedDate}/scoreboard.json`;
  getGameDetailsURL = (formattedDate, gameId) => `/prod/v1/${formattedDate}/${gameId}_boxscore.json`;

  getTeamsURL = '/prod/v2/2018/teams.json';
  getPlayersURL = '/prod/v1/2018/players.json';



  constructor(props) {
    super(props);
    
    this.state = {
      games: [],
      teams: [],
      match: null
    };
  }

  async componentDidMount() {
    this.setState({games: null});
    await this.getNBAGamesToday();
    this.interval = setInterval(async () => {
      await this.getNBAGamesToday();
      console.log(this.state.matchId);
      if (this.state.matchId){
        const matchDetails = await this.getGameDetails(this.formatDate(new Date()),this.state.matchId);
        this.setState({
          match: matchDetails.data
        });
      }

      
      
    }, 10000);

    // await this.getPlayers();
  }

  onClickHandler = async (gameId) => {
    const today = new Date();
    const dateFormatted = this.formatDate(today);
    // this.setState({
    //   match: "loading"
    // });
    try {
      const matchDetails = await this.getGameDetails(dateFormatted,gameId);

      this.setState({
        match: matchDetails.data,
        matchId: gameId
      });
      
      
      
    } 
    catch (e) {
      console.log(e);
    }
    
    
  }

  render() {
    let match = null;
    if (this.state.games===null){
      return ( 
        // <Dimmer active>
          <Loader size='large' active content='Loading' />);
        // </Dimmer>);
    }
    if (this.state.match !== null){
      match = (
      <Grid.Column width={10}>
        <MatchDetails 
        match={this.state.match}
        players={this.state.players}
        ></MatchDetails>
      </Grid.Column>);
    }
    // return (
    //   <div className="App">
      
    //     <header className="App-header">
    //       <img src={nbalogo} className="App-logo" alt="logo" />
          
    //     </header>
        
    //     <div className="App-body">
    //       <div className="MatchesList-container">
    //       <h1>Today's Games</h1>
    //       <MatchesList 
    //       games={this.state.games}
    //       selected={this.onClickHandler}
    //       />
    //       </div>
    //       <div className="MatchDetails-container">{match}</div>
    //     </div>
    //   </div>
    // );
    return (
      <Grid centered>
        <Grid.Row divided className="App-Grid-Header">
          <img src={nbalogo} className="App-logo" alt="logo" />
        </Grid.Row>
        <Grid.Row columns='2' textAlign='centered'>
          <Grid.Column width={4} className='MatchesList-container'>
            <h1>Today's Games</h1>
            <MatchesList 
              games={this.state.games}
              selected={this.onClickHandler}
            />
          </Grid.Column>
          {match}
          
        </Grid.Row>
        
      </Grid>
    );
  }

  async getGameDetails(date, gameId) {
    return await axios.get(this.baseURL + this.getGameDetailsURL(date,gameId));
  }

  async getNBAGamesToday() {

    // this.setState({games: null});
    const today = new Date();
    const dateFormatted = this.formatDate(today);
    const res = await axios.get(this.baseURL + this.getTeamsURL);
    const teams = await res.data.league.standard;
    const res2 = await axios.get(this.baseURL + this.getDayGamesURL(dateFormatted));
    const games = await res2.data.games;
    const res3 = await axios.get(this.baseURL + this.getPlayersURL);
    const players = await res3.data.league.standard;
    
    this.setState({
      games: games,
      teams: teams,
      players: players
    });
    return this.state;
    
  }

  getPlayers = async () => {

  }
}

export default App;


  //getNBAStatus() {
  //   const today = new Date();
  //   const dateFormatted = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
  //   axios.get(`https://stats.nba.com/stats/scoreboard/?GameDate=${dateFormatted}&LeagueID=00&DayOffset=0`)
  //     .then(res => {
  //       console.log(res);
  //       const games = [];
  //       const meta = res.data.resultSets[0].rowSet;
  //       const matches = res.data.resultSets[1].rowSet;
  //       for (let i = 0; i < matches.length; i+=2){
  //         let team1 = matches[i];
  //         let team2 = matches[i+1];
  //         let match = {
  //           // meta: meta[1],
  //           gameID: team1[2],
  //           team1ID: team1[3],
  //           team1Abbr: team1[4],
  //           team1City: team1[5],
  //           team1Record: team1[6],
  //           team1Score: team1[21],
  //           team2ID: team2[3],
  //           team2Abbr: team2[4],
  //           team2City: team2[5],
  //           team2Record: team2[6],
  //           team2Score: team2[21]
  //         }
  //         games.push(match);
  //       }
  //       for (let i = 0; i < meta.length; i++){
  //         games[i]['currentTime'] = meta[i][12];
  //       }

  //       this.setState({
  //         games: games
  //       });
  //     });
  // }