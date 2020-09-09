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
import CircularProgress from '@material-ui/core/CircularProgress';
//import { filter } from "core-js/fn/dict";


class POTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        PO: [],
        NF_PO: {},
        columns: [],
        isLoading: false,
    }

    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {
    this.setState({ isLoading: true })
    
    if (this.props.location.state) {
      const { NF_PO_id } = this.props.location.state
      const nf_po = await (await api.getNF_POById(NF_PO_id)).data.data
      this.setState({ NF_PO: nf_po })
      // alert(PO.length)

      try {
        let po = this.state.NF_PO.po.map(async po_reference => {
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
  
        this.setState({ PO: po, isLoading: false})
        
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
    // alert(po._id)
    po.is_cancelled = true
    po.last_modified = Date.now()
    try {
      const res = await api.updatePOById(po._id, po)
      console.log(res.data)
      alert("Success")
    } catch (error) {
      alert(error)
    }
    window.location.reload()
  }

  handleDelete = async (po) => {
    try {
      
      const new_NFPO = {...this.state.NF_PO}
      let index = new_NFPO.po.indexOf(po._id)
      new_NFPO.po.splice(index, 1)      
      await api.updateNF_POById(new_NFPO._id, new_NFPO)

      const prf = po.prf
      index = prf.po.indexOf(po._id)
      prf.po.splice(index, 1)
      await api.updatePRFById(prf._id, prf)      
      
      await api.deletePOById(po._id)

      alert('Deleted successfully')
      window.location.reload()
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
                title={this.state.NF_PO.nf_po_number ? `PO ${this.state.NF_PO.nf_po_number}` : 'PO'}
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
                    {
                      this.state.isLoading ?
                      <div style={{padding: "100px 0", textAlign: "center"}}>
                        <CircularProgress />
                      </div> : 

                      <Table striped hover>
                        <thead>
                          <tr>
                            {poHArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {                        
                            !this.state.PO.length ?
                              <p>
                                This list is empty.
                              </p>
                            :
                            this.state.PO.map((prop, key) => {
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
                                    <Link to={{pathname: '/create/New-PO', state: {PO: prop, action: "edit"}}} style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                                    <Button variant="outline-primary" bsStyle="warning" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                                    <Button variant="outline-primary" bsStyle="danger" onClick={() => this.handleDelete(prop)}><i className="pe-7s-junk"/>Delete</Button>{' '}
                                  </td>
                                </tr>
                              );
                          })}
                        </tbody>

                      </Table>
                    }
                    
                    
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
