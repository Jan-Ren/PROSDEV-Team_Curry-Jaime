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
import { prfHArray } from "variables/Variables.jsx"; 

import api from '../api'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessDialog from 'components/SuccessDialog/SuccessDialog.jsx'
import FormDialog from "components/FormDialog/FormDialog";

class PRFTableList extends Component {

  constructor(props) {
    super(props)

      this.state = {
        PRF: [],
        backup_prf:[],
        NF_PRF: {},
        NF_PO: {},
        columns: [],
        isLoading: false,
        open: false,
        success: false,
        open_paiddate: false,
        paid_date: '',
        prf_edit: '',
        from: '',
        to: ''
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

        prf = prf.filter( p => {
          if (!p.is_cancelled)
            return p
        })
  
        this.setState({ PRF: prf, loading: false , backup_prf: prf}, () => console.log(this.state.PRF) )  
        
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
    let backup_prfList = [...this.state.backup_prf]
    if(searchQuery !== ""){
      console.log(searchQuery)
      let prfList = [...this.state.backup_prf]
      console.log(prfList)
      let filteredPRF = prfList.filter(p => {
        console.log(p.prf_number)
        if((p.prf_number + '').includes(searchQuery))
          return p
      })
      console.log(filteredPRF)
      this.setState({ PRF: filteredPRF })
    }else{
      console.log("ds")
      this.setState({ PRF: backup_prfList })
    }
  }

  handleCancel = async (prf) => {
    this.setState({ isLoading: true, open: true, action: 'Cancel' })    
    
    prf.is_cancelled = true
    prf.last_modified = Date.now()
    try {
      await api.updatePRFById(prf._id, prf)
      
      prf.po.map(async po_id => {
        await (await api.cancelPOById(po_id)).data.data        
      })
      
      this.setState({ isLoading: false, success: true })
      
    } catch (error) {
      alert(error)
    }
  }

  handleDelete = async (prf) => {
    try {
      // remove all po's of prf from db and from nf_po
      this.setState({ isLoading: true, open: true, action: 'Delete' })
      
      const nfpos = []
      if (prf.po.length) {
        const PO = await (await api.getPOById(prf.po[0])).data.data
        const NFPO_id = PO.po_folder
        const NFPO = await (await api.getNF_POById(NFPO_id)).data.data
        nfpos.push({
          key: NFPO_id,
          NFPO,
          po_id: [PO._id],
        })
      }

      let temp = prf.po.map(async (po_id, index) => {
        try {          
          // get po's folder id
          if (index !== 0) {

            const NFPO_id = await (await api.getPOById(po_id)).data.data.po_folder
            const NFPO = await (await api.getNF_POById(NFPO_id)).data.data
            if (nfpos.filter(nfpo => nfpo.key === NFPO_id)) {
              nfpos.map(nfpo => {
                if (nfpo.key === NFPO_id) {
                  nfpo.po_id.push(po_id)
                  nfpo.NFPO = NFPO
                }
              })
            } else {
              nfpos.push({
                key: NFPO_id,
                NFPO,
                po_id: [po_id],
              })
              
            }
          }
  
          await api.deletePOById(po_id)
          // await api.updateNF_POById(NFPO_id, NFPO)
        } catch (error) {
          console.log(`hehell ${error}`)
          alert(error)
        }
      })
      
      temp = await Promise.all(temp)
      
      temp = nfpos.map(async object => {
        try {
          const { NFPO, po_id, key } = object

          po_id.map( id => {
            const index = NFPO.po.indexOf(id)
            NFPO.po.splice(index, 1)
          })

          await api.updateNF_POById(key, NFPO)
          
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
      }, 1000)
    } catch (error) {
      console.log(error)
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

  handleDateFilter = async () => {
    this.setState({ loading: true })
    try {
      let { from, to } = this.state
      
      from = moment(from).startOf('day').toDate()
      to = moment(to).endOf('day').toDate()
      const prf = await (await api.getPRFDateRange({ from, to })).data.data
      const PRF = prf.filter(p => {
        if (!p.is_cancelled && p.prf_folder === this.state.NF_PRF._id)
          return p
      })
      this.setState({ PRF })
    } catch (error)  {
      this.setState({ PRF: [] })
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
                title={this.state.NF_PRF.nf_prf_number ? `PRF ${this.state.NF_PRF.nf_prf_number}` : "PRF"}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <React.Fragment>
                  <Col md={12}>
                    <Form inline>
                      <FormGroup controlId="formInlineDateFrom">
                          <ControlLabel>Date From</ControlLabel>{' '}
                        <FormControl type="date" value={this.state.from} onChange={(e) => this.setState({ from: e.target.value })} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineDateFrom">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" value={this.state.to} onChange={(e) => this.setState({ to: e.target.value })}/>
                        </FormGroup>{' '}
                        <Button variant="outline-primary" bsStyle="primary" onClick={this.handleDateFilter}><i className="pe-7s-check"/>Filter Date</Button>{' '}
                        <InputGroup className="pull-right">
                          <FormControl type="number" placeholder="Search PRF#" onChange={this.handleSearch}/>
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                    </Form>
                  </Col>
                  <div>
                  {
                    this.state.loading ?
                    <Row style={{padding: "100px 0", textAlign: "center"}}>
                      <CircularProgress />
                    </Row> : 

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
                          <Row><Col md={12}>
                            This list is empty.
                          </Col></Row> :
                          
                          this.state.PRF.map((prop, key) => {
                            return (
                              !prop.is_cancelled ?

                              (<tr key={`${prop._id} ${key}`}>
                                
                                <td key={`${prop._id} ${key+1}`}>{prop.prf_number}</td>
                                <td key={`${prop._id} ${key+2}`}>{prop.recipient}</td>
                                <td key={`${prop._id} ${key+3}`}>
                                  {!prop.paid_date ? 
                                    <Button  onClick={() => { this.setState({ open_paiddate:true, prf_edit:prop }) }}>Add Paid Date</Button>
                                     : 
                                     <Button bsStyle="success" onClick={() => { this.setState({ open_paiddate:true, prf_edit:prop }) }}>{moment(prop.paid_date).format('MM-DD-YYYY')}</Button>
                                  }</td>
                                <td key={`${prop._id} ${key+4}`}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                <td key={`${prop._id} ${key+5}`}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
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
                    handleClose={this.handleClose}
                    message={"Paid Date"}
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
