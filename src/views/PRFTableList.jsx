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
import { Link, Redirect } from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table, Button, InputGroup, Glyphicon } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { prfHArray, prfDArray } from "variables/Variables.jsx"; 

import DateInput from "components/DatePicker/DatePicker.jsx"
import api from '../api'
import moment from 'moment'
import users from "api/users";

class PRFTableList extends Component {

  constructor(props) {
    super(props)

      this.state = {
        PRF: [],
        columns: [],
        isLoading: false,
    }    
    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {

    try {
      const token = window.localStorage.getItem('token')
      const workingDirectory = await (await users.getUser({ token })).data.data.prf_folder
      
      const folder = await (await api.getNF_PRFById(workingDirectory)).data.data
    
      let prf = folder.prf.map(async prf_reference => {
        const prf = await (await api.getPRFById(prf_reference)).data.data
        console.log(prf)
        return prf        
      })

      prf = await Promise.all(prf)

      this.setState({ PRF: prf})

      console.log(this.state.PRF)
    } catch (error) {
      
    }

  }

  handleCancel = async (prf) => {

    console.log(prf)
    alert(prf._id)
    prf.is_cancelled = true
    try {
      const res = await api.updatePRFById(prf._id, prf)
      alert(prf.po.length)
      prf.po.map(async po_id => {
        const po = await (await api.cancelPOById(po_id)).data.data
        alert(po.is_cancelled)
      })
      console.log(res.data)
      alert("Cancelled")
    } catch (error) {
      alert(error)
    }    
  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/PRF-List-Folders" />
  }
  
  render() {
    return (
      <div className="content">
        { this.handleRedirect() }
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="PRF List"
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
                        <Button variant="outline-primary" bsStyle="primary"><i className="pe-7s-check"/>Filter Date</Button>{' '}
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
                                <Button variant="outline-primary" bsStyle="warning" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                                <></>

                                <Link to={{pathname: '/create/New-PO', state: {PRF: prop, action: "new"}} } style={{ color: "inherit"}} ><Button variant="outline-primary" bsStyle="primary"><i className="pe-7s-look" />New PO</Button>{' '}</Link>
                                <></>
                                <Link to={{pathname: '/create/New-PRF', state: {PRF: prop}}  } style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button></Link>

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
