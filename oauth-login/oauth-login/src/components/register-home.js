import React, { Component } from 'react';

import SignUp from '../containers/sign-up';
import SignIn from '../containers/sign-in';

export default class RegisterHome extends Component {

    render() {
      return (
            <div className="App">
                <header className="App-header">
                    <SignIn />
                </header>
        
                <SignUp />
            </div>
        );
    }
}