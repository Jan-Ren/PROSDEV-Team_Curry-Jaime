import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ReactComponent as ReactLogo} from './undraw_travel_booking_6koc.svg';
import users from '../../api/users'


const options = [
    'Admin', 'Employee'
];
const defaultOption = options[0];

export default class Login extends Component {
    constructor(props) {
        super(props)

        // const storedJwt = localStorage.getItem('token');

        this.state = {
            isAdmin:true,
            password: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
        this.getJwt = this.getJwt.bind(this)
    }

    async getJwt () {
        const { data } = await users.getJWT()
        localStorage.setItem('token', data.token);
        this.setState({ jwt: data.token }, () => { alert(this.state.jwt) });
        console.log(data.token)
    };

    async checkCredentials (e) {
        e.preventDefault()

        // this.getJwt()

        const { isAdmin, password } = this.state
        const payload = { isAdmin, password }
        
        try {
            await users.login(payload).then(res => {
                alert(res.data)
                console.log(res.data)
            })
        } catch (error) {
            alert(error)
            console.log(error.message)
        }
        
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target

        if (name === "isAdmin") {
            if (value === "Admin")
                this.setState({ [name]:true })
            else
                this.setState({ [name]:false })
        } else {
            this.setState({ [name]:value }, () => {
                console.log(this.state.password)
            })
        }
    }

    render() {        
        return (
            <div className="App">
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
                            <Dropdown options={options} onChange={this.handleChange} name="isAdmin" value={defaultOption} placeholder="Select an option" />
                        </div>
                
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="********" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}