import React, { Component } from 'react';

import { withRouter} from 'react-router-dom'

import SignUp from '../containers/sign-up';
import SignIn from '../containers/sign-in';

class RegisterHome extends Component {

    constructor(props){
        super(props);

        fetch('/checkAuth', {})
        .then(res => res.json())
        .then(data => {
            if(data.isAuthenticated)
                this.props.history.push('/profile')
        })
        .catch(err => console.log(err))
    }

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

export default withRouter(RegisterHome)