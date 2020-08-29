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
import { Link } from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table, Button, InputGroup, Glyphicon } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { prfHArray, prfDArray } from "variables/Variables.jsx"; 

import DateInput from "components/DatePicker/DatePicker.jsx"
import api from '../api'
import moment from 'moment'

class PRFTableList extends Component {

  constructor(props) {
    super(props)

      this.state = {
        PRF: [],
        columns: [],
        isLoading: false,
      }    
    
  }
  
  componentDidMount = async () => {

      let prf = this.props.location.state.PRF.map(async prf => {
        if (this.props.location.state.PRF) {
          const prf = await (await api.getPRFById(this.props.location.state.PRF)).data.data
          console.log(prf)
          return prf
        }
      })

      prf = await Promise.all(prf)

      this.setState({ PRF: prf})

      console.log(this.state.PRF)
  }
  
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="PRF #"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <React.Fragment>
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
                        <InputGroup className="pull-right">
                          <FormControl type="number" placeholder="Search PRF#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
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
                      {this.state.PRF.map((prop, key) => {
                        return (
                          <tr key={key}>
                            
                            <td key={key+1}>{prop.prf_number}</td>
                            <td key={key+2}>{prop.recipient}</td>
                            <td key={key+4}>{moment(prop.paid_date).format('MM-DD-YYYY')}</td>
                            <td key={key+4}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                            <td key={key+5}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                            <td>
                                <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-close-circle"/></Button>{' '}
                                <></>
                                <Button variant="outline-primary" bsStyle="primary"><Link to={{pathname: '/employee/New-PO', state: {PRF: prop, action: "new"} }} ><i className="pe-7s-look" />New PO</Link></Button>{' '}
                                <></>
                                <Button variant="outline-secondary"><Link to={{pathname: '/new/New-PRF', state: {PRF: prop} }} ><i className="pe-7s-look" />View</Link></Button>
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
