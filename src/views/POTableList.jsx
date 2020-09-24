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
import { poHArray } from "variables/Variables.jsx";
import api from '../api'
import moment from 'moment'
import users from "api/users";
//import { filter } from "core-js/fn/dict";
import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessDialog from '../components/SuccessDialog/SuccessDialog'
import FormDialog from "components/FormDialog/FormDialog";

class POTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        PO: [],
        backup_po:[],
        columns: [],
        isLoading: false,
        NF_PO: {},
        open: false,
        success: false,
        open_paiddate: false,
        open_admin: false,
        paid_date: '',
        admin_pass: '',
        po_edit: '',
        from: '',
        to: '',
    }

    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {
    this.setState({ loading: true })
  
    try {
      const token = window.localStorage.getItem('token')
      const workingDirectory = await (await users.getUser({ token })).data.data.po_folder
      
      const folder = await (await api.getNF_POById(workingDirectory)).data.data
    
      let po = folder.po.map(async po_reference => {
        const po = await (await api.getPOById(po_reference)).data.data
        console.log(po)
        return po
      })

      po = await Promise.all(po)

      po = po.filter(p => {
        if (!p.is_cancelled)
          return p
      })

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

      this.setState({ PO: po, NF_PO: folder, loading: false, backup_po: po })
    } catch (error) {
      this.setState({ loading: false })    
    }

  }

  handleSearch = (e) => {
    let searchQuery =  e.target.value
    let backup_poList = [...this.state.backup_po]
    if(searchQuery !== ""){
      console.log(searchQuery)
      let poList = [...this.state.backup_po]
      console.log(poList)
      let filteredPO = poList.filter(p => {
        console.log(p.po_number)
        if((p.po_number + '').includes(searchQuery))
          return p
      })
      console.log(filteredPO)
      this.setState({ PO: filteredPO })
    }else{
      this.setState({ PO: backup_poList })
    }
  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/PO-List-Folders" />      
  }
  
  handleCancel = async () => {
    this.setState({ isLoading: true, open_admin: true, action: 'Cancel' })
    // console.log(po)
    // alert(po._id)
    const { currentPO: po } = this.state

    po.is_cancelled = true
    try {
      const res = await api.updatePOById(po._id, po)
      console.log(res.data)
      // alert("Cancelled")
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

  handleFormClose = () => {
    this.setState({ open_admin:false, open_paiddate: false });
  }

  handleChange = (e) => {
    this.setState({ paid_date: e.target.value, admin_pass: e.target.value })
  }

  handlePaidDate = async () => {
    try {
      this.setState({ isLoading: true, open: true, action: "Update", open_paiddate: false })
      const { po_edit: po, paid_date } = this.state
      po.paid_date = paid_date
      await api.updatePOById(po._id, po)
      this.setState({ isLoading: false, success: true })
    } catch (error) {
      this.setState({ isLoading: false, success: false })
    }
  }

  handleAdminPassword = async () => {
    try {
      this.setState({ isLoading: true, open: true, action: "Cancel", open_admin: false })
      const { admin_pass } = this.state
      await users.login({ isAdmin: true, password: admin_pass })
      this.handleCancel()
      this.setState({ isLoading: false, success: true, open_admin: false })
    } catch (error) {
      this.setState({ isLoading: false, success: false })
    }
  }

  handleDateFilter = async () => {
    this.setState({ loading: true })
    try {
      let { from, to } = this.state
      
      from = moment(from).startOf('day').toDate()
      to = moment(to).endOf('day').toDate()
      const po = await (await api.getPODateRange({ from, to })).data.data
      const PO = po.filter(p => {
        if (!p.is_cancelled && p.po_folder === this.state.NF_PO._id)
          return p
      })
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
      
      this.setState({ PO })
    } catch (error)  {
      this.setState({ PO: [] })
    }
    this.setState({ loading: false })
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
                        <FormControl type="date" value={this.state.from} onChange={(e) => this.setState({ from: e.target.value })}/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" value={this.state.to} onChange={(e) => this.setState({ to: e.target.value })}/>
                        </FormGroup>{' '}
                        <Button variant="outline-primary" bsStyle="primary" onClick={this.handleDateFilter}><i className="pe-7s-check"/>Filter Date</Button>{' '}
                        
                        <InputGroup className="pull-right">
                          <FormControl type="number" placeholder="Search PO#" onChange={this.handleSearch}/>
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>                        
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
                            <Row><Col md={12}>
                              This list is empty.
                            </Col></Row> :
                            
                            this.state.PO.map((prop, key) => {
                              return (
                                <tr key={key}>
                                  {/* {prop.map((prop, key) => {
                                    return <td key={key}>{prop}</td>;
                                  })} */}
                                  <td key={key+1}>{prop.po_number}</td>
                                  <td key={key+2}>{prop.recipient}</td>
                                  <td key={key+3}>
                                    {!prop.paid_date ? 
                                      <Button onClick={() => { this.setState({ open_paiddate:true, po_edit:prop }) }}>Add Paid Date</Button>
                                      : 
                                      <Button bsStyle="success" onClick={() => { this.setState({ open_paiddate:true, po_edit:prop }) }}>{moment(prop.paid_date).format('MM-DD-YYYY')}</Button>
                                    }</td>
                                  <td key={key+4}>{prop.prf ? prop.prf.prf_number: prop.prf}</td>
                                  <td key={key+5}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td key={key+6}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td>
                                    <Link to={{pathname: '/create/New-PO', state: {PO: prop, action: "edit"}}} style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button></Link>
                                    <Button variant="outline-primary" bsStyle="warning" onClick={() => { this.setState({ open_admin: true, currentPO: prop }) }}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      
                      </Table>
                    }
                    <SuccessDialog
                      open={this.state.open}
                      handleClose={this.handleClose}
                      success={this.state.success}
                      isLoading={this.state.isLoading}
                      action={this.state.action}
                      />
                    <FormDialog
                      open={this.state.open_paiddate}
                      type={"date"}
                      value={this.state.paid_date}
                      handleChange={this.handleChange}
                      handleEvent={this.handlePaidDate}
                      handleClose={this.handleFormClose}
                      message={"Paid Date"}
                      />
                    <FormDialog
                      open={this.state.open_admin}
                      type={"password"}
                      value={this.state.admin_pass}
                      handleChange={this.handleChange}
                      handleEvent={this.handleAdminPassword}
                      handleClose={this.handleFormClose}
                      message={"admin password"}
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

export default POTableList;
