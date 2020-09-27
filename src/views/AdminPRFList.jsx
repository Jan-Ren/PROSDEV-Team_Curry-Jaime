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
import { Grid, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Card from "components/Card/Card.jsx";

import users from '../api/users'
import api from '../api'
import FormDialog from "components/FormDialog/FormDialog";
import SuccessDialog from "components/SuccessDialog/SuccessDialog";
import { CircularProgress } from "@material-ui/core";

class PRFListFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isAdmin: '',
        prfFolder: [],
        columns: [],
        isLoading: false,
        open: false,
        open_nf: false,
        nf_prf_number: '',
        open_modal: false,
    }    
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })
    try{
      await api.getAllNF_PRF().then(prfFolder => {
      this.setState({
        prfFolder: prfFolder.data.data,
        isLoading: false,
      }, () => {
          console.log(this.state.prfFolder)
        })
      })
    }catch(e){
      this.setState({ isLoading: false })
      console.log(e)
    }
  }

  deleteWorkingDirectory = async () => {
    this.setState({ loading: true, open: true, action: "Delete", open_modal: false })
    try{
        const working_directory = this.state.currentNF
        let temp1 = working_directory.prf.map(async prf_id => {
          try {
            let prf =await (await api.getPRFById(prf_id)).data.data
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
            await api.deletePRFById(prf_id)
            temp = await Promise.all(temp)
            // alert(`should be deleted ${new_NFPO.po.length}`)
            // await api.updateNF_POById(new_NFPO._id, new_NFPO)
      
            // alert(prf._id)
      
            // const new_NFPRF = {...this.state.NF_PRF}
            // const index = new_NFPRF.prf.indexOf(prf._id)
            // new_NFPRF.prf.splice(index, 1)
            
            // await api.updateNF_PRFById(new_NFPRF._id, new_NFPRF)
            //await api.deletePRFById(prf_id)
      
            setTimeout(() => {
              this.setState({ isLoading: false, success: true })
            }, 1000)
            // // get po's id
            // const po_id = await (await api.getPRFById(prf_id)).data.data.po
            // let temp1 = po_id.map(async poid => {
            //    // get po's folder id
            //   const NFPO_id = await (await api.getPOById(poid)).data.data.po_folder
            //   // get po folder
            //   const NFPO = await (await api.getNF_POById(NFPO_id)).data.data

            //   const index = NFPO.po.indexOf(po_id)
            //   NFPO.po.splice(index, 1)

            //   await api.deletePOById(po_id)
            //   await api.updateNF_POById(NFPO_id, NFPO)
            // })
            // await api.deletePRFById(prf_id)
            // temp1 = await Promise.all(temp)
            
          } catch (error) {
            console.log(`hehe ${error}`)
            setTimeout(() => {
              this.setState({ loading: false, success: false })
            }, 1000)
          }
        })
        await api.deleteNF_PRFById(working_directory._id)
        temp1 = await Promise.all(temp1)

        setTimeout(() => {
          this.setState({ loading: false, success: true })
        }, 1000)

      } catch (error) {    
        console.log(error)
        setTimeout(() => {
          this.setState({ loading: false, success: false })
        }, 1000)
      }
      console.log(this.state.success)
  }

  setWorkingDirectory = async (curr_working_directory) => {
    this.setState({ loading: true, open: true, action: "Set" })
    //FOR EMPLOYEE
    const payload = {
      isAdmin : false,
      prf_folder: curr_working_directory
    }
    
    try {
      await users.updatePRF_Folder(payload)
      
      //FOR ADMIN
      payload.isAdmin = true
      await users.updatePRF_Folder(payload)
      setTimeout(() => {
        this.setState({ loading: false, success: true })
      }, 1000)
    } catch (error) {
      console.log(error.message)
      setTimeout(() => {
        this.setState({ loading: false, success: false })
      }, 1000)
    }

  }

  handleClose = () => {
    this.setState({ open:false });
    window.location.reload()
  }

  handleChange = (e) => {
    this.setState({ nf_prf_number: e.target.value })
  }

  handleAddNF = async () => {
    try {
      this.setState({ loading: true, open: true, action: "Add", open_nf: false })
      const { nf_prf_number } = this.state
      if (nf_prf_number/100 >= 1 && nf_prf_number/100 <= 9) {
        await api.insertNF_PRF({nf_prf_number})
        setTimeout(() => {          
          this.setState({ loading: false, success: true })
        }, 1000)
      }
      else {
        setTimeout(() => {
          this.setState({ loading: false, success: false })
        }, 1000)
      }
    } catch (error) {
      setTimeout(() => {
        this.setState({ loading: false, success: false })
      }, 1000)
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="PRF List"
                ctTableResponsive
                content={
                    <div>
                        <Col md={12}><Button bsStyle="info" className="block pull-right" onClick={() => this.setState({ open_nf:true })}><i className="pe-7s-plus"/>New Folder</Button></Col>
                        {
                          this.state.isLoading ?
                          <Row style={{padding: "100px 0", textAlign: "center"}}>
                            <CircularProgress />
                          </Row> : 

                          <Table striped hover>
                              <tbody>
                              {
                                !this.state.prfFolder.length ?

                                <tr>
                                  <td>
                                    This list is empty.
                                  </td>
                                </tr> :

                                this.state.prfFolder.map((prop, key) => {
                                    return (
                                    <tr key={`${prop._id} ${key}`}>

                                        <td key={`${prop._id} ${key+1}`}>{prop.nf_prf_number}</td>

                                        <td>
                                        <Button variant="outline-secondary" bsStyle="danger" onClick={(e)=> { this.setState({ open_modal:true, currentNF: prop }) }} className="pull-right" ><i className="pe-7s-close-circle"/>Delete</Button>
                                        <Button variant="outline-secondary" bsStyle="primary" onClick={(e)=>this.setWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                        <Link to={{pathname: '/admin/PRF-List', state: {NF_PRF_id: prop._id} }} ><Button className="pull-right"><i className="pe-7s-look"/>View</Button></Link>
                                        </td>
                                    </tr>
                                    
                                    );
                                })
                              }
                              
                              </tbody>
                          </Table>
                        }
                        <SuccessDialog
                          open={this.state.open}
                          handleClose={this.handleClose}
                          success={this.state.success}
                          isLoading={this.state.loading}
                          action={this.state.action}
                          />
                        <FormDialog
                          open={this.state.open_nf}
                          type={"number"}
                          value={this.state.nf_prf_number}
                          handleChange={this.handleChange}
                          handleEvent={this.handleAddNF}
                          handleClose={this.handleClose}
                          message={"PRF Initials"}
                          />
                        <Modal show={this.state.open_modal} onHide={() => this.setState({open_modal: false})}>
                          <Modal.Header closeButton>
                            <Modal.Title>Message</Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <p>Are you sure you want to delete?</p>
                            <p>Documents will also be deleted including the POs from each PRF</p>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button bsStyle="secondary" onClick={() => this.setState({open_modal: false})}>Close</Button>
                            <Button bsStyle="danger" onClick={this.deleteWorkingDirectory}>Delete</Button>
                          </Modal.Footer>
                        </Modal>
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

export default PRFListFolders;
