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
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog.jsx'
import FormDialog from "components/FormDialog/FormDialog";

class PRFTableList extends Component {

  constructor(props) {
    super(props)

      this.state = {
        PRF: [],
        NF_PRF: {},
        NF_PO: {},
        columns: [],
        isLoading: false,
        open: false,
        success: false,
        open_paiddate: false,
        paid_date: '',
        prf_edit: '',
    }

    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount = async () => {
    this.setState({ loading: true })

    if (this.props.location.state) {

      try {
        const { NF_PRF_id } = this.props.location.state
        const nf_prf = await (await api.getNF_PRFById(NF_PRF_id)).data.data
        this.setState({ NF_PRF: nf_prf }, () => console.log(this.state.NF_PRF) )
  
        let prf = this.state.NF_PRF.prf.map(async prf_reference => {
          const prf = await (await api.getPRFById(prf_reference)).data.data
          console.log(prf)
          return prf
        })
  
        prf = await Promise.all(prf)
  
        this.setState({ PRF: prf, loading: false }, () => console.log(this.state.PRF) )
  
        // const user = await (await users.getUser({ token: window.localStorage.getItem('token')})).data.data
        
        // const NF_PO = await (await api.getNF_POById(user.po_folder)).data.data
        // this.setState({ NF_PO }, () => console.log(this.state.NF_PO))
        
      } catch (error) {
        console.log(error.message)
        alert(error)
      }

    } else {
      this.setState({ redirect: true })
    }
  }

  handleCancel = async (prf) => {
    this.setState({ isLoading: true, open: true, action: 'Cancel' })
    console.log(prf)
    // alert(prf._id)
    prf.is_cancelled = true
    prf.last_modified = Date.now()
    try {
      const res = await api.updatePRFById(prf._id, prf)
      // alert(prf.po.length)
      prf.po.map(async po_id => {
        const po = await (await api.cancelPOById(po_id)).data.data
        // alert(po.is_cancelled)
      })
      console.log(res.data)
      // alert("Success")
      this.setState({ isLoading: false, success: true })
      // setTimeout(() => {
      // }, 1500)
    } catch (error) {
      alert(error)
    }
  }

  handleDelete = async (prf) => {
    try {      
      // alert(prf.po.length)
      
      // const new_NFPO = {...this.state.NF_PO}
      // alert(`not yet deleted ${new_NFPO.po.length}`)
      // remove all po's of prf from db and from nf_po
      this.setState({ isLoading: true, open: true, action: 'Delete' })
      let temp = prf.po.map(async po_id => {
        try {          
          // alert(po_id)
          // get po's folder id
          const NFPO_id = await (await api.getPOById(po_id)).data.data.po_folder
          // get po folder
          const NFPO = await (await api.getNF_POById(NFPO_id)).data.data          

          const index = NFPO.po.indexOf(po_id)
          NFPO.po.splice(index, 1)
  
          await api.deletePOById(po_id)
          await api.updateNF_POById(NFPO_id, NFPO)
          
        } catch (error) {
          console.log(`hehe ${error}`)
          alert(error)
        }
      })
      
      temp = await Promise.all(temp)
      // alert(`should be deleted ${new_NFPO.po.length}`)
      // await api.updateNF_POById(new_NFPO._id, new_NFPO)

      // alert(prf._id)

      const new_NFPRF = {...this.state.NF_PRF}
      const index = new_NFPRF.prf.indexOf(prf._id)
      new_NFPRF.prf.splice(index, 1)

      await api.updateNF_PRFById(new_NFPRF._id, new_NFPRF)
      await api.deletePRFById(prf._id)

      setTimeout(() => {
        this.setState({ isLoading: false, success: true })
      }, 1500)
    } catch (error) {
      alert(error)
    }
  }

  handleRedirect = () => {
    if (this.state.redirect)
      return <Redirect to="/admin/PRF-List-Folders" />
  }

  handleClose = () => {
    this.setState({ open:false, open_paiddate:false });
    window.location.reload()
  }

  handleChange = (e) => {
    this.setState({ paid_date: e.target.value })
  }

  handlePaidDate = async () => {
    try {
      this.setState({ isLoading: true, open: true, action: "Update", open_paiddate: false })
      const { prf_edit: prf, paid_date } = this.state
      prf.paid_date = paid_date
      await api.updatePRFById(prf._id, prf)
      this.setState({ isLoading: false, success: true })
    } catch (error) {
      this.setState({ isLoading: false, success: false })
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
                title={this.state.NF_PRF.nf_prf_number ? `PRF ${this.state.NF_PRF.nf_prf_number}` : "PRF"}
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
                  {
                    this.state.loading ?
                    <div style={{padding: "100px 0", textAlign: "center"}}>
                        <CircularProgress />
                    </div> : 

                    <Table striped hover>
                      <thead>
                        <tr>
                          {prfHArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !this.state.PRF.length ?
                            <p>
                              This list is empty.
                            </p>
                          :
                          this.state.PRF.map((prop, key) => {
                            return (
                              !prop.is_cancelled ?

                              (<tr key={key}>
                                
                                <td key={key+1}>{prop.prf_number}</td>
                                <td key={key+2}>{prop.recipient}</td>
                                <td key={key+4}>
                                  {!prop.paid_date ? 
                                    <Button bsStyle="info" onClick={() => { this.setState({ open_paiddate:true, prf_edit:prop }) }}>Add Paid Date</Button>
                                     : 
                                     <Button bsStyle="info" onClick={() => { this.setState({ open_paiddate:true, prf_edit:prop }) }}>{moment(prop.paid_date).format('MM-DD-YYYY')}</Button>
                                  }</td>
                                <td key={key+4}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                <td key={key+5}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                <td>
                                    <Link to={{pathname: '/create/New-PRF', state: {PRF: prop}}  } style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                                    <></>
                                    <Link to={{pathname: '/create/New-PO', state: {PRF: prop, action: "new"} }} style={{ color: "inherit"}} ><Button variant="outline-primary" bsStyle="primary"><i className="pe-7s-look" />New PO</Button>{' '}</Link>
                                    <></>
                                    <Button variant="outline-primary" bsStyle="warning" onClick={() => this.handleCancel(prop)}><i className="pe-7s-close-circle"/>Cancel</Button>{' '}
                                    <></>
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
