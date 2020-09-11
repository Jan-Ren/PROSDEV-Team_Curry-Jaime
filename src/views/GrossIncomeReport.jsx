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
import { FormControl,  Form, FormGroup, ControlLabel, Grid, Row, Col, Table} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { grossHArray, grossDArray } from "variables/Variables.jsx";
import FormInputs from "components/FormInputs/FormInputs";


class AdminPOTableList extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Gross Income Report"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Col md={12}>
                        
                    <Form inline>
                    <FormGroup controlId="selectPRFFolder">
                       <FormControl componentClass="select">
                           <option>Select PRF Folder</option>
                           <option>...</option>
                        </FormControl>
                       </FormGroup>{' '}
                      
                        <FormGroup controlId="formInlineDateTo" className="pull-right">  
                          <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom" className="pull-right">
                          <ControlLabel>Dates</ControlLabel>{' '}
                        <FormControl type="date" />
                        </FormGroup>{' '}

                    </Form>
                  </Col>

                    <Table striped hover>
                    <thead>
                      <tr>
                        {grossHArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {grossDArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            
                          </tr>
                        );
                      })}
                    </tbody>
                  
                  </Table>
                  <Col md={2}>
                    <Form inline>
                        <FormGroup controlId="total">
                          <ControlLabel>Total</ControlLabel>{' '}
                        <FormControl type="number" />
                        </FormGroup>{' '}
                    </Form>
                </Col>
        <div className="clearfix" />
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AdminPOTableList;
