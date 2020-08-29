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

class PRFListFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isAdmin: '',
        prfFolder: [],
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

    await api.getAllNF_PRF().then(prfFolder => {
        this.setState({
            prfFolder: prfFolder.data.data,
            isLoading: false,
        }, () => {
          console.log(this.state.prfFolder)
        })
    })
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
                            {this.state.prfFolder.map((prop, key) => {
                                return (
                                <tr key={key}>

                                    <td key={key}>{prop.nf_prf_number}</td>;

                                    <td>
                                    <Button variant="outline-secondary" bsStyle="danger" className="pull-right"><i className="pe-7s-close-circle"/></Button>
                                    <Button variant="outline-secondary" bsStyle="primary" onClick={(e)=>this.setWorkingDirectory(prop)} className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                    <Button className="pull-right" href="/employee/PRF-List"><Link to={{pathname: '/employee/PRF-List', state: {PRF: prop} }} ><i className="pe-7s-look"/>View</Link></Button>
                                    {/* <Button className="pull-right"><Link to={{pathname: '/employee/PRF-List', state: {PRF: prop.prf} }} ><i className="pe-7s-look"/>View</Link></Button> */}
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

export default PRFListFolders;
