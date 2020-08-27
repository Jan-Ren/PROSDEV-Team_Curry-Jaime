/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/css/App.css";

import AdminLayout from "layouts/Admin.jsx";
import EmployeeLayout from "layouts/Employee.jsx";
import PRFLayout from "layouts/PRF.jsx";
import Login from "./components/Login/login.component";



ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/Employee" render={props => <EmployeeLayout {...props} />} />
      <Route path="/Admin" render={props => <AdminLayout {...props} />} />
      <Route path="/new" render={props => <PRFLayout {...props} />} />
      <Route path="/Employee/New-PRF" render={props => <PRFLayout {...props} />} />
      <Redirect from="/" to="/employee/PRF-List" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);