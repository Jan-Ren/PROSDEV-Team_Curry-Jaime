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
import { Route, Switch } from "react-router-dom";

import PRFSidebar from "components/Sidebar/PRFSidebar.jsx";


import routes from "routes.js";
import adminDashboardRoutes from "adminRoutes";
import users from "api/users";
import Sidebar from "components/Sidebar/Sidebar";


class PRF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      routes: routes,
      loading: true
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome, <b>Employee!</b>
         
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/create") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleColorClick = color => {
    this.setState({ color: "black" });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  async componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    
    const token = window.localStorage.getItem('token')
    try {
      const user = await (await users.getUser({token})).data.data
      console.log(user.isAdmin)
      if (user.isAdmin)
        this.setState({ routes: adminDashboardRoutes, loading: false })
      else
        this.setState({ routes: routes, loading: false })
    } catch (error) {
      alert(`${error} putae`)
      this.setState({ authenticated: false })
    }
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        {
          this.state.loading ?           
          <Sidebar {...this.props} routes={this.state.routes} image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}/>
          :
          <Sidebar {...this.props} routes={this.state.routes} image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}/>
        }
        <div id="main-panel" className="main-panel" ref="mainPanel">
        <Switch>{this.getRoutes(routes)}
          </Switch>
        </div>
      </div>
    );
  }
}

export default PRF;
