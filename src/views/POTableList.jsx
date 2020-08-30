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

      let po = this.props.location.state.PO.map(async po_reference => {
        if (this.props.location.state.PO) {
          const po = await (await api.getPOById(po_reference)).data.data
          console.log(po)
          return po
        }
      })
  
      po = await Promise.all(po)
  
      this.setState({ PO: po})
  
      console.log(this.state.PRF)
  
      let prf = this.state.PO.map(async po => {
        if ( this.state.PO.prf) {
          const prf = await (await api.getPRFById(this.state.PO.prf)).data.data
          return prf
        }
      })
      
      prf = await Promise.all(prf)
      prf.map((p, index) => {
        if (p) {
          console.log(p)
          console.log(index)
          this.state.PO[index].prf = p
        }
      })
    } else {
      this.setState({ redirect: true })
    }

    // this.setState({ PO, isLoading: false })
    // const PO = await (await api.getAllPO()).data.data

    // let prf = PO.map(async po => {
    //   if (po.prf) {
    //     const prf = await (await api.getPRFById(po.prf)).data.data
    //     console.log(prf.prf_number)
    //     return prf
    //   }
    // })
    
    // prf = await Promise.all(prf)
    // prf.map((p, index) => {
    //   if (p) {
    //     console.log(p)
    //     console.log(index)
    //     PO[index].prf = p
    //   }
    // })
    // this.setState({ PO, isLoading: false })
  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/PO-List-Folders" />      
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
                    <Col md={8}>
                    <Form inline>
                      <FormGroup controlId="formInlineDateFrom">
                          <ControlLabel>Dates</ControlLabel>{' '}
                        <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                          <FormControl type="date" />
                        </FormGroup>{' '}
                        <FormGroup>
                        <InputGroup>
                          <FormControl type="number" placeholder="Search PO#" />
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
                              <Button variant="outline-primary" bsStyle="danger" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/></Button>{' '}
                              <Button variant="outline-secondary"><Link to={{pathname: '/employee/New-PO', state: {PO: prop, action: "edit"}}} style={{ color: "inherit"}} ><i className="pe-7s-look" />View</Link></Button>
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
