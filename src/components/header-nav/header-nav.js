import React, { Component } from 'react';

import axios from 'axios';
import { Loader, Grid, Button } from 'semantic-ui-react'
import { withRouter, BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class HeaderNav extends Component {


    state = {
        };
    componentDidMount() {
        if (this.props.location.pathname.includes('/app/matches')){
            this.setState({value: 0});
        }
        if (this.props.location.pathname.includes('/app/leaderboards')){
            this.setState({value: 1});
        }
       }
    componentWillReceiveProps() {
        console.log(this.props.history.location);
        if (this.props.history.location.pathname.includes('/app/matches')){
            this.setState({value: 0});
        }
        if (this.props.history.location.pathname.includes('/app/leaderboards')){
            this.setState({value: 1});
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
        if (value===0) {
            this.props.history.push('/app/matches');
        } else if (value===1) {
            this.props.history.push('/app/leaderboards');
        }
    };

    render() {
        let value = this.state.value;
        return (
            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary">
                <Tab label="Matches"/>
                <Tab label="LeaderBoards" />
            </Tabs>);
    }

}

export default withRouter(HeaderNav);