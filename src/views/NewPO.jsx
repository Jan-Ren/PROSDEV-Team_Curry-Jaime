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
            <Col md={8}>
              <Card
                title="New PO"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-2","col-md-2","col-md-5","col-md-3"]}
                      properties={[
                        {
                          label: "PRF#",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "PRF#",
                          defaultValue: "",
                          readOnly: true
                        },
                        {
                          label: "PO#",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "PO#",
                          defaultValue: "",
                          readOnly: true
                        },
                        {
                          label: "To",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Recepient",
                          defaultValue: ""
                        },
                        {
                          label: "Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Email"
                        }
                      ]}
                    />
                    <h5>Pax Name/s</h5>
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Enter Name/s",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: ""
                        }
                      ]}

                    />
                    <Button variant="outline-secondary" onClick={(e)=>this.addName(e)}>+</Button>
                    {
                      this.state.PAXNames.map((PAXNames, index)=>{
                        return(
                          <div key={index}>
                            <FormInputs
                            ncols={["col-md-6"]}
                            properties={[
                              {
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Enter Name",
                                defaultValue: ""
                              }
                            ]}
                            onChange={(e)=>this.handleChange(e,index)}
                            value={PAXNames}
                          /> 
                          <Button variant="outline-secondary" onClick={(e)=>this.handleRemove(e)}>-</Button>
                          </div>
                        )
                      })
                    } 
                    <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Particulars</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Input Particulars"
                            defaultValue=""
                          />
                        </FormGroup>
                      </Col>
                      <FormInputs
                      ncols={["col-md-3","col-md-3","col-md-3","col-md-3"]}
                      properties={[
                        {
                          label: "US$ to PHP",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue:""
                        },
                        {
                          label: "US$",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue:""
                        },
                        {
                          label: "PHP",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue: ""
                        },
                        {
                          label: "Total",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TOTAL AMOUNT",
                          defaultValue: ""
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4","col-md-4","col-md-4"]}
                      properties={[
                        {
                          label: "Prepared By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue:""
                        },
                        {
                          label: "Approved By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: ""
                        },
                        {
                          label: "Received By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: ""
                        }
                      ]}
                    />
                      <Button pullRight bsStyle="info"  fill type="submit"> Save PRF </Button>
                      <Button pullRight bsStyle="danger" fill type="submit"> Cancel </Button>
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
