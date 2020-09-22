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
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog.jsx'
import FormDialog from "components/FormDialog/FormDialog";

class POTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        PO: [],
        backup_po:[],
        NF_PO: {},
        columns: [],
        isLoading: false,
        open: false,
        success: false,
        open_paiddate: false,
        paid_date: '',
        po_edit: '',
        from: '',
        to: '',
    }

    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {
    this.setState({ loading: true })
    
    if (this.props.location.state) {
      const { NF_PO_id } = this.props.location.state
      const nf_po = await (await api.getNF_POById(NF_PO_id)).data.data
      this.setState({ NF_PO: nf_po })

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
  
        this.setState({ PO: po, loading: false, backup_po: po})
        
      } catch (error) {
        console.log(error.message)
        alert(error)
      }
      
    } else {
      this.setState({ redirect: true })
    }

  }

  handleSearch = (e) => {
    let searchQuery =  e.target.value
    let backup_poList = [...this.state.backup_po]
    if(searchQuery != ""){
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
      console.log("ds")
      this.setState({ PO: backup_poList })
    }
  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/admin/PO-List-Folders" />      
  }
  
  handleCancel = async (po) => {
    this.setState({ isLoading: true, open: true, action: 'Cancel' })
    
    po.is_cancelled = true
    po.last_modified = Date.now()
    try {
      const res = await api.updatePOById(po._id, po)
      
      this.setState({ isLoading: false, success: true })
      
    } catch (error) {
      alert(error)
    }
  }

  handleDelete = async (po) => {
    try {
      this.setState({ isLoading: true, open: true, action: 'Delete' })
      const new_NFPO = {...this.state.NF_PO}
      let index = new_NFPO.po.indexOf(po._id)
      new_NFPO.po.splice(index, 1)      
      await api.updateNF_POById(new_NFPO._id, new_NFPO)

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

  handleClose = () => {
    this.setState({ open:false });
    window.location.reload()
  }

  handleChange = (e) => {
    this.setState({ paid_date: e.target.value })
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
                          <FormControl type="date" value={this.state.from} onChange={(e) => this.setState({ from: e.target.value })} />
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
                                !prop.is_cancelled ?

                                (<tr key={key}>                                  
                                  <td key={key+1}>{prop.po_number}</td>
                                  <td key={key+2}>{prop.recipient}</td>
                                  <td key={key+4}>
                                    {!prop.paid_date ? 
                                      <Button onClick={() => { this.setState({ open_paiddate:true, po_edit:prop }) }}>Add Paid Date</Button>
                                      : 
                                      <Button bsStyle="success" onClick={() => { this.setState({ open_paiddate:true, po_edit:prop }) }}>{moment(prop.paid_date).format('MM-DD-YYYY')}</Button>
                                    }</td>
                                  <td key={key+4}>{prop.prf ? prop.prf.prf_number: prop.prf}</td>
                                  <td key={key+5}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td key={key+6}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td>
                                    <Link to={{pathname: '/create/New-PO', state: {PO: prop, action: "edit"}}} style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                                    <Button variant="outline-primary" bsStyle="warning" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                                    <Button variant="outline-primary" bsStyle="danger" onClick={() => this.handleDelete(prop)}><i className="pe-7s-junk"/>Delete</Button>{' '}
                                  </td>
                                </tr>)
                                :
                                ''
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
                    <FormDialog
                    open={this.state.open_paiddate}
                    type={"date"}
                    value={this.state.paid_date}
                    handleChange={this.handleChange}
                    handleEvent={this.handlePaidDate}
                    handleClose={this.handleClose}
                    message={"Input Paid Date"}
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
