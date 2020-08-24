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
import { FormControl, Form, FormGroup, InputGroup, Glyphicon, ControlLabel, Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { poHArray, poDArray } from "variables/Variables.jsx";


class AdminPOTableList extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="PO List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Col md={12}>
                    <Form inline>
                    <FormGroup controlId="formInlineDateFrom">
                          <ControlLabel>Date From</ControlLabel>{' '}
                        <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" />
                        </FormGroup>{' '}
                        <Button variant="outline-primary" bsStyle="primary"><i className="pe-7s-check"/></Button>{' '}
                        <FormGroup className="pull-right">
                        <InputGroup>
                          <FormControl type="number" placeholder="Search PO#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                        <InputGroup>
                          <FormControl type="number" placeholder="Search PRF#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </Col>

                    <Table striped hover>
                    <thead>
                      <tr>
                        {poHArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {poDArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td>
                            <Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>
                            <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-close-circle"/></Button>{' '}
                            <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-junk"/></Button>{' '}
                            </td>
                            
                          </tr>
                        );
                      })}
                    </tbody>
                  
                  </Table>
                    
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
