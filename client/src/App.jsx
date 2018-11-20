import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import CreateUser from './components/CreateUser.jsx';
import UserData from './components/UserData.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'state'
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" render={props => <Home {...props}/>} />
            <Route path="/profile" render={props => <Profile {...props}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}