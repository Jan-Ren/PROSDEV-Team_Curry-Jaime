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
import { Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table, Button, InputGroup, Glyphicon, Modal } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { prfHArray } from "variables/Variables.jsx";

// import DateInput from "components/DatePicker/DatePicker.jsx"
import api from "../api";
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessDialog from '../components/SuccessDialog/SuccessDialog'


class AdminCancelledPRF extends Component {

  constructor (props) {
    super(props)
    this.state = {
      PRF: [],
      backup_prf:[],
      isLoading: false,
      from: '',
      to: '',
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    
    try {
      const PRF = await (await api.getCancelledPRF()).data.data
      this.setState({ PRF, loading: false, backup_prf: PRF })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
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

  handleDelete = async () => {
    try {
      // remove all po's of prf from db and from nf_po
      this.setState({ isLoading: true, open: true, action: 'Delete' })
      const prf = this.state.currentPRF

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

      const new_NFPRF = await (await api.getNF_PRFById(prf.prf_folder)).data.data      
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

  handleUncancel = async () => {
    this.setState({ isLoading: true, open: true, action: 'Uncancel' })
    const prf = this.state.currentPRF

    prf.is_cancelled = false
    prf.last_modified = Date.now()
    try {
      await api.updatePRFById(prf._id, prf)

      setTimeout(() => {
        this.setState({ isLoading: false, success: true })
      }, 1000)
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
      const prf = await (await api.getPRFDateRange({ from, to })).data.data
      const PRF = prf.filter(p => {
        if (p.is_cancelled)
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
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Cancelled PRFs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <React.Fragment>
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
                          <FormControl type="number" placeholder="Search PRF#" onChange={this.handleSearch} />
                          <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                          </InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
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
                              <tr key={`${prop._id} ${key}`}>
                                  
                                  <td key={`${prop._id} ${key+1}`}>{prop.prf_number}</td>
                                  <td key={`${prop._id} ${key+2}`}>{prop.recipient}</td>
                                  <td key={`${prop._id} ${key+3}`}>{prop.paid_date ? moment(prop.paid_date).format('MM-DD-YYYY') : ''}</td>
                                  <td key={`${prop._id} ${key+4}`}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td key={`${prop._id} ${key+5}`}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td>
                                <Link to={{pathname: '/create/New-PRF', state: {PRF: prop, is_cancelled: true}}  } style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
                                <Button variant="outline-primary" bsStyle="success" onClick={() => this.setState({ open_modal: true, currentPRF: prop, action: "uncancel" })}><i className="pe-7s-back-2"/> Uncancel</Button>{' '}
                                <Button variant="outline-primary" bsStyle="danger" onClick={() => this.setState({ open_modal: true, currentPRF: prop, action: "delete" })}><i className="pe-7s-close-circle"/>Delete</Button>{' '}
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
                  <Modal show={this.state.open_modal} onHide={() => this.setState({open_modal: false})}>
                    <Modal.Header closeButton>
                      <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p>{`Are you sure you want to ${this.state.action}?`}</p>
                      <p>{this.state.action==="delete" ? `All PO documents from this PRF will apply the same effect.`: ""}</p>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button bsStyle="secondary" autoFocus onClick={() => this.setState({open_modal: false})}>Cancel</Button>
                      <Button bsStyle={this.state.action === "uncancel" ? "success": "danger"} 
                        onClick={() => { this.state.action==="uncancel" ? this.handleUncancel() : this.handleDelete(); this.setState({open_modal:false})}}>
                        Confirm
                      </Button>
                    </Modal.Footer>
                  </Modal>
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

export default AdminCancelledPRF;
