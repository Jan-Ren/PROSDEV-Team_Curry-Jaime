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
import api from "../api";
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog.jsx'


class AdminCancelledPRF extends Component {

  constructor (props) {
    super(props)
    this.state = {
      PRF: [],
      isLoading: false,
      open: false,
      success: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    
    try {
      const PRF = await (await api.getCancelledPRF()).data.data
      this.setState({ PRF, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  handleDelete = async (prf) => {
    try {
      this.setState({ isLoading: true, open: true, action: 'Delete' })
      
      // deleting all po's under this prf
      let temp = prf.po.map(async po_id => {
        try {
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

      // removing from folder and deleting actual PRF
      const NFPRF_id = prf.prf_folder
      const NF_PRF = await (await api.getNF_PRFById(NFPRF_id)).data.data
      const index = NF_PRF.prf.indexOf(prf._id)
      NF_PRF.prf.splice(index, 1)

      await api.updateNF_PRFById(NFPRF_id, NF_PRF)
      await api.deletePRFById(prf._id)

      setTimeout(() => {
        this.setState({ isLoading: false, success: true })
      }, 1500)
    } catch (error) {
      alert(error)
    }
  }

  handleUncancel = async (prf) => {
    this.setState({ isLoading: true, open: true, action: 'Uncancel' })
    
    prf.is_cancelled = false
    prf.last_modified = Date.now()
    try {
      await api.updatePRFById(prf._id, prf)

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
                          <p>This list is empty.</p>
                          :
                          this.state.PRF.map((prop, key) => {
                            return (
                              <tr key={key}>
                                  
                                  <td key={key+1}>{prop.prf_number}</td>
                                  <td key={key+2}>{prop.recipient}</td>
                                  <td key={key+4}>{moment(prop.paid_date).format('MM-DD-YYYY')}</td>
                                  <td key={key+4}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td key={key+5}>{moment(prop.last_modified).format('MM-DD-YYYY hh:mm:ss A')}</td>
                                  <td>
                                <Link to={{pathname: '/create/New-PRF', state: {PRF: prop, is_cancelled: true}}  } style={{ color: "inherit"}} ><Button variant="outline-secondary"><i className="pe-7s-look" />View</Button>{' '}</Link>
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
