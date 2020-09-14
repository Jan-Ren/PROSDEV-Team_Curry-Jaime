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
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Card from "components/Card/Card.jsx";

import users from '../api/users'
import api from '../api'
import FormDialog from "components/FormDialog/FormDialog";
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
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
        nf_prf_number: ''
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
      console.log(e)
    }
  }

  deleteWorkingDirectory = async (working_directory) => {
    //FOR EMPLOYEE
    const payload = {
      prf_folder: working_directory
    }
    
    try{
        let temp = working_directory.prf.map(async prf_id => {
          try {          
            // alert(po_id)
            // get po's id
            const po_id = await (await api.getPRFById(prf_id)).data.data.po
            let temp1 = po_id.map(async poid => {
               // get po's folder id
              const NFPO_id = await (await api.getPOById(poid)).data.data.po_folder
              // get po folder
              const NFPO = await (await api.getNF_POById(NFPO_id)).data.data

              const index = NFPO.po.indexOf(po_id)
             NFPO.po.splice(index, 1)

             await api.deletePOById(po_id)
              await api.updateNF_POById(NFPO_id, NFPO)
            })
            await api.deletePRFById(prf_id)
            temp1 = await Promise.all(temp)
          } catch (error) {
            console.log(`hehe ${error}`)
            alert(error)
          }
        })
        await api.deleteNF_PRFById(working_directory._id)
        temp = await Promise.all(temp)
      }catch (error) {
        alert(error)
      }

  }

  setWorkingDirectory = async (curr_working_directory) => {
    //FOR EMPLOYEE
    const payload = {
      isAdmin : false,
      prf_folder: curr_working_directory
    }
    
    console.log(payload)
    try {
      await users.updatePRF_Folder(payload).then(res => {   
        alert("saving done")
      })
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
    
    //FOR ADMIN
    payload.isAdmin = true
    
    console.log(payload)
    try {
      await users.updatePRF_Folder(payload).then(res => {   
        alert("saving done")
      })
    } catch (error) {
      console.log(error.message)
      alert(error.message)
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
      this.setState({ isLoading: true, open: true, action: "Add", open_nf: false })
      const { nf_prf_number } = this.state
      
      if (nf_prf_number/100 > 0 && nf_prf_number/100 <= 9) {
        await api.insertNF_PRF({nf_prf_number})
        this.setState({ isLoading: false, success: true })
      }
      else {
        this.setState({ isLoading: false, success: false })
      }
    } catch (error) {
      this.setState({ isLoading: false, success: false })
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
                          <div style={{padding: "100px 0", textAlign: "center"}}>
                            <CircularProgress />
                          </div> : 

                          <Table striped hover>
                              {/* <thead>
                              <tr>
                                  {poHArray.map((prop, key) => {
                                  return <th key={key}>{prop}</th>;
                                  })}
                              </tr>
                              </thead> */}
                              <tbody>
                              {this.state.prfFolder.map((prop, key) => {
                                  return (
                                  <tr key={key}>

                                      <td key={key}>{prop.nf_prf_number}</td>

                                      <td>
                                      <Button variant="outline-secondary" bsStyle="danger" onClick={(e)=>this.deleteWorkingDirectory(prop)} className="pull-right" ><i className="pe-7s-close-circle"/>Delete</Button>
                                      <Button variant="outline-secondary" bsStyle="primary" onClick={(e)=>this.setWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                      <Link to={{pathname: '/admin/PRF-List', state: {NF_PRF_id: prop._id} }} ><Button className="pull-right"><i className="pe-7s-look"/>View</Button></Link>
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
                        <FormDialog
                          open={this.state.open_nf}
                          type={"number"}
                          value={this.state.nf_prf_number}
                          handleChange={this.handleChange}
                          handleEvent={this.handleAddNF}
                          handleClose={this.handleClose}
                          message={"Input PRF Initials"}
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

export default PRFListFolders;
