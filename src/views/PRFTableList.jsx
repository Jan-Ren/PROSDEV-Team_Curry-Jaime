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
import { Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { prfHArray, prfDArray } from "variables/Variables.jsx"; 

import DateInput from "components/DatePicker/DatePicker.jsx"



class PRFTableList extends Component {

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="PRF List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <React.Fragment>
                  <Col md={3}>
                    <Form inline>
                      <FormGroup controlId="formInlineDateFrom">
                          <ControlLabel>Dates</ControlLabel>{' '}
                        <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                          <FormControl type="date" />
                        </FormGroup>{' '}
                    </Form>
                  </Col>
                  <div>

                  <Table striped hover>
                    <thead>
                      <tr>
                        {prfHArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {prfDArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td>
                                <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-close-circle"/></Button>{' '}
                                <></>
                                <Button variant="outline-primary" bsStyle="primary" href="/employee/New-PO"><i className="pe-7s-news-paper" /> New PO</Button>{' '}
                                <></>
                                <Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    
                  </Table>
                  </div>
                
                  </React.Fragment>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PRFTableList;
