import React from 'react';
import {ReactComponent as ReactLogo} from './undraw_travel_booking_6koc.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";

function App() {
  return (<Router>
    <div className="App">

      {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <div className="auth-wrapper">
        <div className="auth-inner">
        <ReactLogo 
          height='200px' width='500 px'
          alt="login logo"
         />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;