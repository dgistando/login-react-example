import React, {Component} from 'react'

import _fetch from '../lib/fetchWrapper'

export default class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            siEmail : '',
            siPassword : ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    onFormSubmit(){
        _fetch('auth/login',{
            email : this.state.siEmail,
            password : this.state.siPassword
        }).then(res => {
            console.log(res.json())
        }).catch(err => {
            console.log(err)
        })
    }

    handleChange(event){
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    render(){
        return(
            <div>
                <form className="sign-in form-inline" >
                <div className="form-group mb-2">
                    <input type="email" id="siEmail" className="form-control" placeholder="Email address" required="" autoFocus="" onChange={this.handleChange}/>
                    <input type="password" id="siPassword" className="form-control" placeholder="Password" required="" onChange={this.handleChange} />
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