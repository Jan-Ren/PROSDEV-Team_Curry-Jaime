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
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class NewPO extends Component {

  state = {
    PAXNames:[],
  }

  addName(){
    this.setState({PAXNames: [...this.state.PAXNames, ""]})
  }
  handleChange(e, index){
    this.state.PAXNames[index] = e.target.value
    this.setState({PAXNames:this.state.PAXNames})
  }
  handleRemove(index){
    this.state.PAXNames.splice(index,1)
    this.setState({PAXNames: this.state.PAXNames})
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            <Card
                title="Admin"
                content={
                <form>
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Current Password: ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "New Password: ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Re-Type ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                     <Button pullRight bsStyle="success" fill> <i className="pe-7s-diskette" /> Save</Button>
                    <div className="clearfix" />
                </form>
                }
            />
            
            </Col>
            <Col md={8} mdOffset={2}>
            <Card
                title="Employee"
                content={
                <form>
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Current Password: ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "New Password: ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Re-Type ",
                        type: "password",
                        bsClass: "form-control",
                        }

                    ]}
                    />
                    <Button pullRight bsStyle="success" fill> <i className="pe-7s-diskette" /> Save</Button>
                    <div className="clearfix" />
                </form>
                }
            />
            
            </Col>
        </Row>
        </Grid>
       
    </div>
    );
}
}

export default NewPO;