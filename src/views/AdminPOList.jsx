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

import Card from "components/Card/Card.jsx";
//import { poFolder } from "variables/Variables.jsx";
import { Link } from 'react-router-dom'
import users from '../api/users'
import api from '../api'
import ConfirmationDialog from "components/ConfirmationDialog/ConfirmationDialog";
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
        nf_po_number: ''
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
  deleteWorkingDirectory = async (working_directory) => {
    this.setState({ isLoading: true})
    try{
        let temp = working_directory.po.map(async po_id => {
          try {          
            // alert(prf_id)
            // get prf's id
            const prf_id = await (await api.getPOById(po_id)).data.data.prf

            // get prf
            const prf = await (await api.getPRFById(prf_id)).data.data
            

            const index = prf.po.indexOf(po_id)
            prf.po.splice(index, 1)

            await api.updatePRFById(prf_id, prf)
          
            await api.deletePOById(po_id)
          } catch (error) {
            console.log(`hehe ${error}`)
            alert(error)
          }
        })
        await api.deleteNF_POById(working_directory._id)
        temp = await Promise.all(temp)

        this.setState({ isLoading: false, success: true })
        window.location.reload()
      }catch (error) {
        alert(error)
        this.setState({ isLoading: false, success: false })
        window.location.reload()
      }

  }
  setWorkingDirectory = async (curr_working_directory) => {
    //FOR EMPLOYEE
    const payload = {
      isAdmin : false,
      po_folder: curr_working_directory
    }
    
    console.log(payload)
    try {
      await users.updatePO_Folder(payload).then(res => {   
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
      await users.updatePO_Folder(payload).then(res => {   
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
    this.setState({ nf_po_number: e.target.value })
  }

  handleAddNF = async () => {
    try {
      this.setState({ isLoading: true, open: true, action: "Add", open_nf: false })
      const { nf_po_number } = this.state
      
      if (nf_po_number/100 > 0 && nf_po_number/100 <= 9) {
        await api.insertNF_PO({nf_po_number})
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
                title="PO List"
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
                                {
                                  !this.state.poFolder.length ?
                                  <tr><td>
                                    This list is empty.
                                  </td></tr> :
                                  this.state.poFolder.map((prop, key) => {
                                      return (
                                      <tr key={key}>

                                          <td key={key}>{prop.nf_po_number}</td>

                                          <td>
                                          <Button variant="outline-secondary" bsStyle="danger" onClick={(e)=>this.deleteWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-close-circle"/>Delete</Button>
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
                            value={this.state.nf_po_number}
                            handleChange={this.handleChange}
                            handleEvent={this.handleAddNF}
                            handleClose={this.handleClose}
                            message={"Input PO Initials"}
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

export default POListFolders;
