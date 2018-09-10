import React, {Component} from 'react'
import '../App.css'

import _fetch from '../lib/fetchWrapper'

export default class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            sufirstName : '',
            sulastName : '',
            suemail : '',
            supassword : '',
            suconfirmPassword : ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    checkFormData(){
        //return a boolean of whether or not the total checks of all the data is true or false.
    }

    onFormSubmit(){        
        _fetch('auth/register',{
                firstName : this.state.sufirstName,
                lastName : this.state.sulastName,
                email : this.state.suemail,
                password : this.state.supassword
        }).then(res => {
            console.log(res.json())
        }).catch(err => {
            console.log(err)
        })
    }

    handleChange(event){
        event.preventDefault()
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    render(){
        return(
            <div>
                <p className="App-intro">
                    Hello! Please Sign up
                </p>

                <form className="form-signup col-md-5 order-md-1" onSubmit={this.onFormSubmit}>

                    <div className="row">
                        <div className="col">
                            <input type="text" id="sufirstName" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <input type="text" id="sulastName" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                    </div>


                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="suemail" className="form-control" placeholder="Email address" required="" autoFocus="" value={this.state.email} onChange={this.handleChange}/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="supassword" className="form-control" placeholder="Password" required="" value={this.state.password} onChange={this.handleChange}/>
                    <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
                    <input type="password" id="suconfirmPassword" className="form-control" placeholder="Confirm Password" required="" value={this.state.confirmPassword} onChange={this.handleChange}/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onFormSubmit}>Sign Up</button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        );
    }
}