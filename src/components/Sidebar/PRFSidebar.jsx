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
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
      >
        <div className="sidebar-wrapper">
          <ul className="nav">
                    <li className={this.activeRoute("/table")}>
                    <NavLink to={'/table'} className="nav-link" activeClassName="active">
                        <i className="pe-7s-note2"></i>
                        <p>Dashboard</p>
                    </NavLink>
                    </li>
                    <li className={this.activeRoute("/table")}>
                    <NavLink to={'/table'} className="nav-link" activeClassName="active">
                        <i className="pe-7s-plus"></i>
                        <p>New PRF</p>
                    </NavLink>
                    </li>
                    <li className="active-pro">
                    <NavLink to={'/table'} className="nav-link" activeClassName="active">
                        <i className="pe-7s-back"></i>
                        <p>Back</p>
                    </NavLink>
                    </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
