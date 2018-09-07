import React, {Component} from 'react'

export default class SignUp extends Component {

    render(){
        return(
            <div>
                <form className="sign-in form-inline" >
                <div className="form-group mb-2">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                </div>
                <div className="form-group mx-sm-3 mb-2">    
                    <button type="submit" className="btn btn-primary mb-2">Sign In</button>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="autoSizingCheck2" />
                    <label className="form-check-label" htmlFor="autoSizingCheck2">
                    Remember me
                    </label>
                </div>

                </form>
            </div>
        );
    }
}