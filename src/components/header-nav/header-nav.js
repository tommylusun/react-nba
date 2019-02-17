import React, { Component } from 'react';

import styles from './header-nav.module.css';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class HeaderNav extends Component {

    state = {value: 0};

    componentDidMount() {
        //this.setState( {value: -1});
        this.updateActiveTab(this.props.location.pathname);
    }

    componentWillReceiveProps() {
        this.updateActiveTab(this.props.history.location.pathname);
    }

    updateActiveTab = (pathname) => {
        if (pathname.includes('/app/matches')){
            this.setState({value: 0});
        } 
        else if (pathname.includes('/app/leaderboards')){
            this.setState({value: 1});
        }
        else if (pathname.includes('/app/players')){
            this.setState({value: 2});
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
        if (value===0) {
            this.props.history.push('/app/matches');
        } else if (value===1) {
            this.props.history.push('/app/leaderboards');
        } else if (value===2) {
            this.props.history.push('/app/players');
        }
    };

    render() {
        let value = this.state.value;
        return (
            <div className={styles.navbar}>
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange} indicatorColor="primary">
                    <Tab label="Matches"/>
                    <Tab label="LeaderBoards" />
                    <Tab label="Players" />
                </Tabs>
            </div>
            );
    }

}

export default withRouter(HeaderNav);