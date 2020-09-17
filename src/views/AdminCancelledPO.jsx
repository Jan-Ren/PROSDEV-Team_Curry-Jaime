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
import api from "../api";
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog.jsx'

class AdminPOTableList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      PO: [],
      isLoading: false,
      open: false,
      success: false,
      from: '',
      to: '',
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })    

    try {
      const PO = await (await api.getCancelledPO()).data.data  
      
      let prf = PO.map(async po => {
        if ( po.prf) {
          const prf = await (await api.getPRFById(po.prf)).data.data
          return prf
        }
      })
      
      prf = await Promise.all(prf)
      prf.map((p, index) => {
        if (p) {
          console.log(p)
          console.log(index)
          PO[index].prf = p
        }
      })

      this.setState({ PO, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  handleDelete = async (po) => {
    try {
      this.setState({ isLoading: true, open: true, action: 'Delete' })            
      
      // removing from folder and deleting actual PRF
      const NFPO_id = po.po_folder
      const NF_PO = await (await api.getNF_POById(NFPO_id)).data.data
      let index = NF_PO.po.indexOf(po._id)
      NF_PO.po.splice(index, 1)      
      await api.updateNF_POById(NFPO_id, NF_PO)

      const prf = po.prf
      index = prf.po.indexOf(po._id)
      prf.po.splice(index, 1)

      await api.updatePRFById(prf._id, prf)            
      await api.deletePOById(po._id)

      setTimeout(() => {
        this.setState({ isLoading: false, success: true })
      }, 1500)
    } catch (error) {
      alert(error)
    }
  }

  handleUncancel = async (po) => {
    this.setState({ isLoading: true, open: true, action: 'Uncancel' })
    
    po.is_cancelled = false
    po.last_modified = Date.now()
    try {
      await api.updatePOById(po._id, po)

      setTimeout(() => {
        this.setState({ isLoading: false, success: true })
      }, 1500)
    } catch (error) {
      alert(error)
    }
  }

  handleClose = () => {
    this.setState({ open:false });
    window.location.reload()
  }

  handleDateFilter = async () => {
    this.setState({ loading: true })
    try {
      let { from, to } = this.state
      
      from = moment(from).startOf('day').toDate()
      to = moment(to).endOf('day').toDate()
      const po = await (await api.getPODateRange({ from, to })).data.data
      const PO = po.filter(p => {
        if (p.is_cancelled)
          return p
      })
      this.setState({ PO })
    } catch (error)  {
      this.setState({ PO: [] })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Cancelled POs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Col md={12}>
                    <Form inline>
                      <FormGroup controlId="formInlineDateFrom">
                          <ControlLabel>Date from</ControlLabel>{' '}
                        <FormControl type="date" value={this.state.from} onChange={(e) => this.setState({ from: e.target.value })}/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateTo">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" value={this.state.to} onChange={(e) => this.setState({ to: e.target.value })}/>
                        </FormGroup>{' '}
                        <Button variant="outline-primary" bsStyle="primary" onClick={this.handleDateFilter}><i className="pe-7s-filter"/> Filter Date</Button>{' '}

                        <FormGroup className="pull-right">
                        <InputGroup>
                          <FormControl type="number" placeholder="Search PO#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="pull-right">
                        <InputGroup>
                          <FormControl type="number" placeholder="Search PRF#" />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                        </FormGroup>
                    </Form>
                  </Col>
                    {
                      this.state.loading ?
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
                          <p>This list is empty.</p>
                          :
                          this.state.PO.map((prop, key) => {
                            return (
                              <tr key={key}>
                                  
                                  <td key={key+1}>{prop.po_number}</td>
                                  <td key={key+2}>{prop.recipient}</td>
                                  <td key={key+4}>{prop.paid_date ? moment(prop.paid_date).format('MM-DD-YYYY') : ''}</td>
                                  <td key={key+4}>{prop.prf ? prop.prf.prf_number: prop.prf}</td>
                                  <td key={key+5}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td key={key+6}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td>
                                <Link to={{pathname: '/create/New-PO', state: {PO: prop, action: "edit", is_cancelled: true}}  } style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                                <Button variant="outline-primary" bsStyle="success" onClick={() => this.handleUncancel(prop)}><i className="pe-7s-back-2"/> Uncancel</Button>{' '}
                                <Button variant="outline-primary" bsStyle="danger" onClick={() => this.handleDelete(prop)}><i className="pe-7s-close-circle"/>Delete</Button>{' '}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    
                    </Table>
                  }
                    <ConfirmationDialog
                    open={this.state.open}
                    handleClose={this.handleClose}
                    success={this.state.success}
                    isLoading={this.state.isLoading}
                    action={this.state.action}
                    />
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
