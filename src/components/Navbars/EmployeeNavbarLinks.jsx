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
import {  Nav, Form, FormControl, Button } from "react-bootstrap";

class EmployeeNavbarLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
        </Nav>
        <Nav pullRight>
          <Form inline>
            <FormControl type="text" placeholder="PRF#" className="mr-sm-2" />
            <Button variant="outline-success"><i className="fa fa-search" /> </Button>
        </Form>
        </Nav>
        
      </div>
    );
  }
}

export default EmployeeNavbarLinks;
