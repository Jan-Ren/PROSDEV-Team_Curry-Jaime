import React, { Component } from "react";
import 'react-dropdown/style.css';
import {ReactComponent as ReactLogo} from './undraw_travel_booking_6koc.svg';
import { Redirect } from 'react-router-dom';
import Select from "react-dropdown-select";
import users from '../../api/users'


const options = [
    { value: true, label: 'Admin'},
    { value: false, label: 'Employee'}
];

export default class Login extends Component {
    constructor(props) {
        super(props)

        // const storedJwt = localStorage.getItem('token');

        this.state = {
            isAdmin:true,
            password: '',
            login_success: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
        this.getJwt = this.getJwt.bind(this)
    }

    async getJwt () {
        const { data } = await users.getJWT()
        localStorage.setItem('token', data.token);
        this.setState({ jwt: data.token });
        console.log(data.token)
    };

    async checkCredentials (e) {
        e.preventDefault()

        // this.getJwt()

        const { isAdmin, password } = this.state
        const payload = { isAdmin, password }        

        try {
            const data = (await users.login(payload)).data
            console.log(data)
            localStorage.setItem('token', data.token)
            this.setState({ login_success: true })
        } catch (error) {
            alert("Wrong credentials")
            console.log(error.message)
        }
        
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target

        this.setState({ [name]:value }, () => {
            console.log(this.state.password)
        })
    }

    handleIsAdmin = isAdmin => {
        this.setState({ isAdmin: isAdmin[0].value })
    }

    handleRedirect() {
        if (this.state.login_success) {

            if (this.state.isAdmin)
                return <Redirect from='/' to='/Admin' />
            else
                return <Redirect from='/' to='/Employee' />
        }
    }

    render() {        
        return (        
            <div className="App">

                { this.handleRedirect() }

                <div className="auth-wrapper">
                    <div className="auth-inner">
                    <ReactLogo 
                    height='200px' width='500 px'
                    alt="login logo"
                    />
                    <form onSubmit={this.checkCredentials}>
                        <h3>Welcome!</h3>
                
                        <div className="form-group">
                            <label>User</label>
                            {/* <input type="email" className="form-control" placeholder="name@example.com" /> */}
                            <Select required options={options} onChange={this.handleIsAdmin} placeholder="Select an option" data-testid="user"/>
                        </div>
                
                        <div className="form-group">
                            <label>Password</label>
                            <input required type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="********" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}