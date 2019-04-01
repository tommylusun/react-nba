import React, {
    Component
} from 'react';
import styles from './match-details.module.css';
import { Loader, Grid } from 'semantic-ui-react'
import PlayerStats from './player-stats/player-stats';
import GameStats from './game-stats/game-stats';
import axios from 'axios';
import { urlConstants } from '../../utils/url-constants';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe';
import MediaQuery from 'react-responsive';
import Button from '@material-ui/core/Button';

class GameDetails extends Component {

    baseURL = urlConstants.BASE_URL;
    state = {
        game: null,
        team1Color: '#ffffff',
        team2Color: '#ffffff',
        showTeam: 'h',
        mobileNavValue: 0
    };

    loading = (<Loader className={styles.loading} inline='centered' active content='Loading' />);

    async componentDidMount() {
        this.hPlayers = this.loading;
        this.vplayers = this.loading;
        await this.getGameDetails(this.props.match.params.date, this.props.match.params.id);


        this.liveUpdate = setInterval(async () => {
            await this.getGameDetails(this.props.match.params.date, this.props.match.params.id);
        }, 5000);
    }

    async componentWillReceiveProps(nextProps) {

        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.setState({ game: null });
            await this.getGameDetails(nextProps.match.params.date, nextProps.match.params.id);
        }
    }

    async getGameDetails(date, gameId) {
        try {
            const matchDetails = await axios.get(this.baseURL + urlConstants.GET_GAME_DETAILS(date, gameId));
            const vTeam = await this.getTeamName(matchDetails.data.basicGameData.vTeam.teamId);
            const hTeam = await this.getTeamName(matchDetails.data.basicGameData.hTeam.teamId);
            matchDetails.data.basicGameData.vTeam['fullName'] = vTeam.fullName;
            matchDetails.data.basicGameData.hTeam['fullName'] = hTeam.fullName;
            const team1Color = hTeam.primaryColor;
            const team2Color = vTeam.primaryColor;
            this.setState(
                {
                    game: matchDetails.data,
                    team1Color: team1Color,
                    team2Color: team2Color
                });
            return;
        }
        catch (e) {
            console.log(e);
        }
        return true;
    }

    getTeamName(teamId) {
        return this.props.teams.find(team => team.teamId === teamId);
    }


    gameStats = (stats) => {
        return (
            <GameStats stats={stats} />
        );
    }
    componentWillUnmount() {
        clearInterval(this.liveUpdate);
    }

    render() {

        if (!this.state.game || !this.props.players) {
            return (
                <div className={styles.container}>
                    <div className={styles['container-placeholder']}>
                        {this.loading}
                    </div>
                </div>
            );
        }
        if (!!this.state.game.stats && !!this.state.game.basicGameData && !!this.state.game.stats.activePlayers) {
            this.basicGameData = this.state.game.basicGameData;
            this.game = this.state.game.stats;
            this.home = this.basicGameData.hTeam;
            this.away = this.basicGameData.vTeam;
            this.activePlayers = this.game.activePlayers;

            return (
                <div className={[styles.container, 'containerCard'].join(' ')}>
                    <Helmet>
                        <title>{`${this.home.fullName}`} vs {`${this.away.fullName}`} Score - {`${new Date(this.basicGameData.startTimeUTC).toDateString()}`} - NBA Stats Simplified</title>
                    </Helmet>
                    <Grid className={styles.grid}>
                        <Grid.Row centered className={[styles.gameStats, ''].join(' ')}>
                            <GameStats team1Color={this.state.team1Color} team2Color={this.state.team2Color} stats={this.basicGameData} />
                        </Grid.Row>
                        <MediaQuery maxWidth={780}>
                            <Grid.Row centered className={styles.playerStats}>
                                <ReactSwipe></ReactSwipe>
                                {/* <Tabs fullWidth value={this.state.mobileNavValue} onChange={(event, value) => this.setState({ mobileNavValue: value })} indicatorColor="primary">
                                    <Tab style={{ width: '50%' }} label={this.home.fullName} />
                                    <Tab style={{ width: '50%' }} label={this.away.fullName} />
                                </Tabs>
                                <Grid.Column className={[styles.playerscol, 'innerCard'].join(' ')}>
                                    {this.mobileNavValue === 0 ? this.hPlayers : this.vPlayers}
                                </Grid.Column> */}
                                <Button variant="outlined" style={{ width: '40%', margin: '10px' }} onClick={() => this.reactSwipe.slide(0)}>{this.home.fullName}</Button>
                                <Button variant="outlined" style={{ width: '40%', margin: '10px' }} onClick={() => this.reactSwipe.slide(1)}>{this.away.fullName}</Button>
                                <ReactSwipe swipeOptions={{ continuous: false }} ref={reactSwipe => (this.reactSwipe = reactSwipe)}>
                                    <div><PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.home.teamId} /></div>
                                    <div><PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.away.teamId} /></div>
                                </ReactSwipe>
                            </Grid.Row>
                        </MediaQuery>
                        <MediaQuery minWidth={780}>
                            <Grid.Row centered className={styles.playerStats}>
                                <Grid.Column className={[styles.playerscol, 'innerCard'].join(' ')}>
                                    <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.home.teamId} />
                                </Grid.Column>
                                <Grid.Column className={[styles.playerscol, 'innerCard'].join(' ')}>
                                    <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.away.teamId} />
                                </Grid.Column>
                            </Grid.Row>
                        </MediaQuery>

                    </Grid>
                </div>
            );
        } else {
            return (
                <div className={[styles.container, 'containerCard'].join(' ')}>
                    <div className={styles['container-placeholder']}>
                        <h3>Game Not Started</h3>
                    </div>
                </div>

            );
        }
    }
}
const mapStateToProps = state => ({
    teams: state.teams,
    players: state.players
});
export default connect(mapStateToProps)(GameDetails);