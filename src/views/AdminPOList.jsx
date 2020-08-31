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

class POListFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isAdmin: '',
        poFolder: [],
        columns: [],
        isLoading: false,
    }    
  }


  componentDidMount = async () => {
    this.setState({ isLoading: true })
    
    const token = localStorage.getItem('token')

    try {
      const user = await users.getUser({token})
      this.state.isAdmin = user.data.data.isAdmin
    } catch (error) {
      alert(`${error} putae`)
      this.setState({ authenticated: false })
    }
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
      console.log(error)
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
                         <Col md={12}><Button bsStyle="info" className="block pull-right"><i className="pe-7s-plus"/>New Folder</Button></Col>
                        <Table striped hover>
                            {/* <thead>
                            <tr>
                                {poHArray.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                                })}
                            </tr>
                            </thead> */}
                            <tbody>
                            {this.state.poFolder.map((prop, key) => {
                                return (
                                <tr key={key}>

                                    <td key={key}>{prop.nf_po_number}</td>;

                                    <td>
                                    <Button variant="outline-secondary" bsStyle="warning" className="pull-right"><i className="pe-7s-close-circle"/>Cancel</Button>
                                    <Button variant="outline-secondary" bsStyle="primary" onClick={(e)=>this.setWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                    <Button className="pull-right"><Link to={{pathname: '/PO-List', state: {PO: prop.po} }} ><i className="pe-7s-look"/>View</Link></Button>
                                    </td>
                                </tr>
                                
                                );
                            })}
                            
                            </tbody>
                        </Table>
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
