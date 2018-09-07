import React, {Component} from 'react'
import '../App.css'

export default class SignUp extends Component {

    render(){
        return(
            <div>
                <p className="App-intro">
                    Hello! Please Sign up
                </p>

                <form className="form-signup col-md-5 order-md-1">

                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                    </div>


                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="suInputEmail" className="form-control" placeholder="Email address" required="" autoFocus=""/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="suInputPassword" className="form-control" placeholder="Password" required=""/>
                    <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
                    <input type="password" id="suInputConfirmPassword" className="form-control" placeholder="Confirm Password" required=""/>


                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        );
    }
}