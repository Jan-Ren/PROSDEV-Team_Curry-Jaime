import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    'Admin', 'Employee'
  ];
const defaultOption = options[0];

export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Welcome!</h3>

                <div className="form-group">
                    <label>User</label>
                    {/* <input type="email" className="form-control" placeholder="name@example.com" /> */}
                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="User" />
                </div>
                

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="********" />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        );
    }
}