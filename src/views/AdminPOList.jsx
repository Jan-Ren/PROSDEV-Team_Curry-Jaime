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

import Card from "components/Card/Card.jsx";
//import { poFolder } from "variables/Variables.jsx";
import { Link } from 'react-router-dom'
import users from '../api/users'
import api from '../api'
import SuccessDialog from "components/SuccessDialog/SuccessDialog";
import FormDialog from "components/FormDialog/FormDialog";
import { CircularProgress } from "@material-ui/core";

class POListFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isAdmin: '',
        poFolder: [],
        columns: [],
        isLoading: false,
        open: false,
        open_nf: false,
        nf_po_number: '',
        open_modal: false
    }    
  }


  componentDidMount = async () => {
    this.setState({ isLoading: true })

    try {
      await api.getAllNF_PO().then(poFolder => {
        this.setState({
            poFolder: poFolder.data.data,
            isLoading: false,
        }, () => {
          console.log(this.state.poFolder)
        })
      })
    } catch (error) {
      this.setState({ poFolder: [], isLoading: false })
      console.log(error)
    }
  }
  deleteWorkingDirectory = async () => {
    this.setState({ loading: true, open: true, action: "Delete", open_modal: false })
    try{
        const working_directory = this.state.currentNF
        await api.deleteNF_POById(working_directory._id)
        const object = []
        if (working_directory.po.length) {
          const po = await (await api.getPOById(working_directory.po[0])).data.data
          object.push({
            key: po.prf,
            values: [po._id]
          })
        }

        let temp = await Promise.all(working_directory.po.map(async (po_id, index) => {
          if (index !== 0) {
            const prf_id = await (await api.getPOById(po_id)).data.data.prf

            if (object.filter(obj => obj.key === prf_id)) {
              object.map(obj => {
                if (obj.key === prf_id) {
                  obj.values.push(po_id)
                }
              })
            } else {
              object.push({
                key: prf_id,
                values: [po_id]
              })
            }
            // let prf = await (await api.getPRFById(prf_id)).data.data
  
            // let index = prf.po.indexOf(po_id)
            // console.log(prf.po)
            // console.log(index)
            // prf.po.splice(index, 1)
            // console.log(prf.po)
            // await api.updatePRFById(prf_id, prf)
            // console.log(prf._id)
            await api.deletePOById(po_id)
          }
        }))

        temp = await Promise.all(object.map(async obj => {
          const { key, values } = obj
          const prf = await (await api.getPRFById(key)).data.data

          values.map(po_id => {
            const index = prf.po.indexOf(po_id)
            prf.po.splice(index, 1)
          })

          await api.updatePRFById(key, prf)
        }))

        setTimeout(() => {
          this.setState({ loading: false, success: true })
        }, 1000)
         
         // temp = await Promise.all(temp)
        
        // setTimeout(() => {
        //   this.setState({ loading: false, success: true })
        // }, 1000)
        // let temp = working_directory.po.map(async po_id => {
        //   try {
        //   //   let po =await (await api.getPOById(po_id)).data.data

        //   //   const prf_id = await (await api.getPOById(po_id)).data.data.prf
        //   //   const prf = await (await api.getPRFById(prf_id)).data.data
        //   //   console.log(po_id)
        //   //   let index = prf.po.indexOf(po_id)
        //   //   prf.po.splice(index, 1)
      
        //   //  await api.updatePRFById(prf_id, prf)            
        //   //   await api.deletePOById(po_id)          
        //     // // alert(prf_id)
        //     // // get prf's id
        //     console.log(po_id)
        //     const prf_id = await (await api.getPOById(po_id)).data.data.prf

        //     // get prf
        //     const prf = await (await api.getPRFById(prf_id)).data.data
            

        //     let index = prf.po.indexOf(po_id)
        //     prf.po.splice(index, 1)

        //     await api.updatePRFById(prf_id, prf)
          
        //     await api.deletePOById(po_id)
        //   } catch (error) {
        //     console.log(`hehe ${error}`)
        //     alert(error)
        //   }
        // })
        // await api.deleteNF_POById(working_directory._id)
        // temp = await Promise.all(temp)

        // setTimeout(() => {
        //   this.setState({ loading: false, success: true })
        // }, 1000)
      }catch (error) {
        alert(error)
        setTimeout(() => {
          this.setState({ loading: false, success: false })
        }, 1000)
      }

  }
  setWorkingDirectory = async (curr_working_directory) => {
    this.setState({ loading: true, open: true, action: "Set" })
    //FOR EMPLOYEE
    const payload = {
      isAdmin : false,
      po_folder: curr_working_directory
    }
    
    try {
      await users.updatePO_Folder(payload)

      //FOR ADMIN
      payload.isAdmin = true
      await users.updatePO_Folder(payload)
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
    this.setState({ nf_po_number: e.target.value })
  }

  handleAddNF = async () => {
    try {
      this.setState({ loading: true, open: true, action: "Add", open_nf: false })
      const { nf_po_number } = this.state
      
      if (nf_po_number/100 >= 1 && nf_po_number/100 <= 9) {
        await api.insertNF_PO({nf_po_number})
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
                title="PO List"
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
                                {/* <thead>
                                <tr>
                                    {poHArray.map((prop, key) => {
                                    return <th key={key}>{prop}</th>;
                                    })}
                                </tr>
                                </thead> */}
                                <tbody>
                                {
                                  !this.state.poFolder.length ?
                                  <tr><td>
                                    This list is empty.
                                  </td></tr> :
                                  this.state.poFolder.map((prop, key) => {
                                      return (
                                      <tr key={`${prop._id} ${key}`}>

                                          <td key={`${prop._id} ${key+1}`}>{prop.nf_po_number}</td>

                                          <td>
                                          <Button variant="outline-secondary" bsStyle="danger" onClick={(e)=>this.setState({ open_modal:true, currentNF: prop })} className="pull-right"><i className="pe-7s-close-circle"/>Delete</Button>
                                          <Button variant="outline-secondary" bsStyle="primary" onClick={(e)=>this.setWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                          <Link to={{pathname: '/admin/PO-List', state: {NF_PO_id: prop._id} }} ><Button className="pull-right"><i className="pe-7s-look"/>View</Button></Link>
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
                            value={this.state.nf_po_number}
                            handleChange={this.handleChange}
                            handleEvent={this.handleAddNF}
                            handleClose={this.handleClose}
                            message={"PO Initials"}
                            />
                          <Modal show={this.state.open_modal} onHide={() => this.setState({open_modal: false})}>
                            <Modal.Header closeButton>
                              <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <p>Are you sure you want to delete?</p>
                              <p>All PO documents inside this folder will be deleted</p>
                            </Modal.Body>

                            <Modal.Footer>
                              <Button bsStyle="secondary" onClick={() => this.setState({open_modal: false})}>Cancel</Button>
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

export default POListFolders;
