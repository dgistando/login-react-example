import React, { Component } from 'react';

import {Route, Switch} from 'react-router-dom';

import RegisterHome from './components/register-home';

import Profile from './containers/profile';

import './App.css';

class App extends Component {

  render() {
    return (
        <main>
          <Switch>
            <Route exact path="/" component={RegisterHome}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
        </main>
    );
  }
}

export default App;
