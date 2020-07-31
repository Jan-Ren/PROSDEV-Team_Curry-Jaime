import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ReactComponent as ReactLogo} from './undraw_travel_booking_6koc.svg';



const options = [
    'Admin', 'Employee'
];
const defaultOption = options[0];

export default class Login extends Component {
    render() {
        return (
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                    <ReactLogo 
                    height='200px' width='500 px'
                    alt="login logo"
                    />
                    <form>
                        <h3>Welcome!</h3>
                
                        <div className="form-group">
                            <label>User</label>
                            {/* <input type="email" className="form-control" placeholder="name@example.com" /> */}
                            <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                        </div>
                
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="********" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}