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
import { FormControl, Form, FormGroup, InputGroup, Glyphicon, ControlLabel, Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { poHArray, poDArray } from "variables/Variables.jsx";
import api from '../api'
import moment from 'moment'
//import { filter } from "core-js/fn/dict";


class POTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        PO: [],
        columns: [],
        isLoading: false,
    }

    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {
    this.setState({ isLoading: true })
  
    if (this.props.location.state) {
      alert(this.props.location.state.PO.length)
      try {
        let po = this.props.location.state.PO.map(async po_reference => {
          try {
            const po = await (await api.getPOById(po_reference)).data.data
            console.log(po)
            return po            
          } catch (error) {
            console.log(error.message)
            alert(error)
          }
          
        })
    
        po = await Promise.all(po)
          
        // console.log(this.state.PRF)
        
        let prf = po.map(async po_reference => {
          if ( po_reference.prf) {
            const prf = await (await api.getPRFById(po_reference.prf)).data.data
            return prf
          }
        })
        
        prf = await Promise.all(prf)
        prf.map((p, index) => {
          if (p) {
            console.log(p)
            console.log(index)
            po[index].prf = p
          }
        })
  
        this.setState({ PO: po})
        
      } catch (error) {
        console.log(error.message)
        alert(error)
      }
      
    } else {
      this.setState({ redirect: true })
    }

  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/admin/PO-List-Folders" />      
  }
  
  handleCancel = async (po) => {

    console.log(po)
    alert(po._id)
    po.is_cancelled = true
    try {
      const res = await api.updatePOById(po._id, po)
      console.log(res.data)
      alert("Cancelled")
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className="content">
        { this.handleRedirect() }
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
                          <ControlLabel>Dates From</ControlLabel>{' '}
                        <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" />
                        </FormGroup>{' '}
                        <Button variant="outline-primary" bsStyle="primary"><i className="pe-7s-check"/>Filter Date</Button>{' '}
                        
                        <InputGroup className="pull-right">
                          <FormControl type="number" placeholder="Search PO#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>                        
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
                      {this.state.PO.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {/* {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })} */}
                            <td key={key+1}>{prop.po_number}</td>
                            <td key={key+2}>{prop.recipient}</td>
                            <td key={key+3}>{moment(prop.paid_date).format('MM-DD-YYYY')}</td>
                            <td key={key+4}>{prop.prf ? prop.prf.prf_number: prop.prf}</td>
                            <td key={key+5}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                            <td key={key+6}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                            <td>
                              <Button variant="outline-primary" bsStyle="warning" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                              <Link to={{pathname: '/create/New-PO', state: {PO: prop, action: "edit"}}} style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                              <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-junk"/>Delete</Button>{' '}
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

export default POTableList;
