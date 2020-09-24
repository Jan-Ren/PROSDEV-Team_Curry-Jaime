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
import { FormControl,  Form, FormGroup, ControlLabel, Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { grossHArray } from "variables/Variables.jsx";
import api from "api";
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';


class AdminPOTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      NF_PRF: [],
      currentNF: {},
      PRF: [],
      isLoading: false,
      total: 0,
      from: '',
      to: '',
    }

    this.handleTotal = this.handleTotal.bind(this)
  }

  componentDidMount = async () => {
    try {
      const NF_PRF = await (await api.getAllNF_PRF()).data.data
      this.setState({ NF_PRF })
    } catch (error) {
      alert(error)
    }
  }

  handleTotal () {
    let total = 0
    if (this.state.PRF.length > 0) {
      total = this.state.PRF.reduce((prev, next) => {
        console.log(prev, next)
        if (prev.gross !== 0 && !prev.gross)
          return prev + next.gross
        
        return prev.gross + next.gross
      })
      
    }
    
    this.setState({ total })
  }

  handleSelect = async (e) => {
    this.setState({ isLoading: true })
    const NF = e.target.value
    
    
    if (NF === "Select PRF Folder")
      this.setState({ PRF: [], isLoading: false })
    
    else {      
      try {
        const NF_PRF = await (await api.getNF_PRFById(NF)).data.data
        let prf = NF_PRF.prf.map(async prf_reference => {
          try {
            return await (await api.getPRFById(prf_reference)).data.data
          } catch (error) {
            console.log(error)
            alert(error)
          }
        })
  
        prf = await Promise.all(prf)
        prf = prf.filter(p => {
          if (!p.is_cancelled)
            return p
        })
        
        let po
        prf = prf.map( async (p, index) => {
  
          po = p.po.map(async po_reference => {
            try {
              const val = await (await api.getPOById(po_reference)).data.data
              return val
            } catch (error) {
              console.log(error)
            }
          })
          
          po = await Promise.all(po)
  
          // add all po total
          if (po.length > 0) {
            let total
            if (po.length === 1)
              total = po[0].total
            else 
              total = po.reduce((prev, next) => {
                console.log(prev, next)
                if (prev.total !== 0 && !prev.total)
                  return prev + next.total
                return prev.total + next.total 
              })
            
            // assign prf po_amount
            p.po_amount = total
            // assugn prf gross
            p.gross = p.total - total            
          } else {
            p.po_amount = 0
            p.gross = p.total
          }
  
          return p
        })
        prf = await Promise.all(prf)
        this.setState({ PRF: prf, currentNF: NF_PRF })
        this.handleTotal()
      } catch (error) {
        console.log(`getting prf ${error}`)
        alert(error)
      }
      this.setState({ isLoading: false })
    }
  }

  handleDateFilter = async () => {
    this.setState({ isLoading: true })
    try {
      let { from, to } = this.state
      
      from = moment(from).startOf('day').toDate()
      to = moment(to).endOf('day').toDate()
      let prf = await (await api.getPRFDateRange({ from, to })).data.data // filtered prf
      const PRF = prf.filter(p => {
        if (!p.is_cancelled && p.prf_folder === this.state.currentNF._id)
          return p
      })

      let po
      prf = PRF.map( async (p, index) => {

        po = p.po.map(async po_reference => {
          try {
            const val = await (await api.getPOById(po_reference)).data.data
            return val
          } catch (error) {
            console.log(error)
          }
        })
        
        po = await Promise.all(po)

        // add all po total
        if (po.length > 0) {
          let total
          if (po.length === 1)
            total = po[0].total
          else 
            total = po.reduce((prev, next) => {
              console.log(prev, next)
              if (prev.total !== 0 && !prev.total)
                return prev + next.total
              return prev.total + next.total 
            })
          
          // assign prf po_amount
          p.po_amount = total
          // assugn prf gross
          p.gross = p.total - total            
        } else {
          p.po_amount = 0
          p.gross = p.total
        }

        return p
      })
      prf = await Promise.all(prf)

      this.setState({ PRF: prf })
    } catch (error)  {
      this.setState({ PRF: [] })
    }
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Gross Income Report"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Col md={12}>
                        
                    <Form inline>
                    <FormGroup controlId="selectPRFFolder">
                      <FormControl componentClass="select" onChange={this.handleSelect}>
                          <option>Select PRF Folder</option>
                            {
                              this.state.NF_PRF.map((prop, key) => {
                                return (        
                                <option value={prop._id} key={key}>{prop.nf_prf_number}</option>
                                    )
                                  })
                            }
                                  </FormControl>
                       </FormGroup>{' '}
                      
                       <Button variant="outline-primary" bsStyle="primary" className="pull-right" onClick={this.handleDateFilter}><i className="pe-7s-filter"/> Filter</Button>{' '}
                        <FormGroup controlId="formInlineDateTo" className="pull-right">  
                        <ControlLabel>to</ControlLabel>{' '}
                          <FormControl type="date" value={this.state.to} onChange={(e) => this.setState({ to: e.target.value })}/>
                        </FormGroup>{' '}
              
                        <FormGroup controlId="formInlineDateFrom" className="pull-right">
                          <ControlLabel>Date from</ControlLabel>{' '}
                        <FormControl type="date" value={this.state.from} onChange={(e) => this.setState({ from: e.target.value })}/>
                        </FormGroup>{' '}

                    </Form>
                  </Col>
                  {
                    this.state.isLoading ?
                    <Row style={{padding: "100px 0", textAlign: "center"}}>
                      <CircularProgress />
                    </Row> : 

                    <Table striped hover>
                    <thead>
                      <tr>
                        {grossHArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>

                      {
                        !this.state.PRF.length ?

                        <tr><td>
                          This list is empty.
                        </td></tr> :

                        this.state.PRF.map((prop, key) => {                          
                          return (
                            <tr>

                              <td key={`${prop._id} ${key+1}`}>{prop.prf_number}</td>
                              <td key={`${prop._id} ${key+2}`}>{moment(prop.date_created).format('MM-DD-YYYY hh:mm:ss A')}</td>
                              <td key={`${prop._id} ${key+3}`}>{prop.paid_date ? moment(prop.paid_date).format('MM-DD-YYYY'): `N/A`}</td>
                              <td key={`${prop._id} ${key+4}`}>{prop.total}</td>
                              <td key={`${prop._id} ${key+5}`}>{prop.po_amount}</td>
                              <td key={`${prop._id} ${key+6}`}>{prop.gross}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  
                  </Table>
                  }

                  <Col md={2}>
                    <Form inline>
                        <FormGroup controlId="total">
                          <ControlLabel>Total</ControlLabel>{' '}
                        <FormControl type="number" value={this.state.total} disabled/>
                        </FormGroup>{' '}
                    </Form>
                </Col>
        <div className="clearfix" />
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
