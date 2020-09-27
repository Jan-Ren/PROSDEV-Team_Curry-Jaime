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
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import users from "api/users";
import SuccessDialog from "components/SuccessDialog/SuccessDialog";

class NewPO extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading:'',
      admin_new_password:'',
      admin_curr_password:'',
      admin_retype_password:'',
      employee_new_password:'',
      employee_curr_password:'',
      employee_retype_password:''
    }    
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveAdminPassword = this.handleSaveAdminPassword.bind(this)
    this.handleSaveEmployeePassword = this.handleSaveEmployeePassword.bind(this)
  }

  handleSaveAdminPassword = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true, open: true, action: "Change" })
    const payload = {
      isAdmin : true,
      password: this.state.admin_curr_password,
      new_password: this.state.admin_new_password
    }
      
      if(this.state.admin_new_password === this.state.admin_retype_password){
        try {
          await users.updatePassword(payload)
          this.setState({
            admin_new_password:'',
            admin_curr_password:'',
            admin_retype_password:'',
            employee_new_password:'',
            employee_curr_password:'',
            employee_retype_password:''
          })
          
          setTimeout(() => {
            this.setState({ isLoading: false, success: true })    
          }, 1000)
          
        } catch (error) {
          console.log(error.message)
          setTimeout(() => {
            this.setState({ isLoading: false, success: false })    
          }, 1000)
        }
      }else{
        alert("New password does not match retype password")
        this.setState({
          admin_new_password:'',
          admin_curr_password:'',
          admin_retype_password:'',
          employee_new_password:'',
          employee_curr_password:'',
          employee_retype_password:''
        })
      }
      
    
  }

  handleChange(e){
    e.preventDefault()
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSaveEmployeePassword = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true, open: true, action: "Change" })
    const payload = {
      isAdmin : false,
      password: this.state.employee_curr_password,
      new_password: this.state.employee_new_password
    }
      
    if(this.state.employee_new_password === this.state.employee_retype_password){
      try {
        await users.updatePassword(payload)
        this.setState({
          admin_new_password:'',
          admin_curr_password:'',
          admin_retype_password:'',
          employee_new_password:'',
          employee_curr_password:'',
          employee_retype_password:''
        })
        
        setTimeout(() => {
          this.setState({ isLoading: false, success: true })    
        }, 1000)
        
      } catch (error) {
        console.log(error.message)
        setTimeout(() => {
          this.setState({ isLoading: false, success: false })    
        }, 1000)
      }
    }else{
      alert("New password does not match retype password")
      this.setState({
        admin_new_password:'',
        admin_curr_password:'',
        admin_retype_password:'',
        employee_new_password:'',
        employee_curr_password:'',
        employee_retype_password:''
      })
    }
    
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            <Card
                title="Admin"
                content={
                <form onSubmit={this.handleSaveAdminPassword.bind(this)}>
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Current Password: ",
                        type: "password",
                        bsClass: "form-control",
                        name:"admin_curr_password",
                        value:this.state.admin_curr_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "New Password: ",
                        type: "password",
                        bsClass: "form-control",
                        name:"admin_new_password",
                        value:this.state.admin_new_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Re-Type ",
                        type: "password",
                        bsClass: "form-control",
                        name:"admin_retype_password",
                        value:this.state.admin_retype_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                     <Button pullRight bsStyle="success" fill type="submit"> <i className="pe-7s-diskette" /> Save</Button>
                    <div className="clearfix" />
                </form>
                }
            />
            
            </Col>
            <Col md={8} mdOffset={2}>
            <Card
                title="Employee"
                content={
                <form onSubmit={this.handleSaveEmployeePassword.bind(this)}>
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Current Password: ",
                        type: "password",
                        bsClass: "form-control",
                        name:"employee_curr_password",
                        value:this.state.employee_curr_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "New Password: ",
                        type: "password",
                        bsClass: "form-control",
                        name:"employee_new_password",
                        value:this.state.employee_new_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                    <FormInputs
                    ncols={["col-md-5"]}
                    properties={[
                        {
                        label: "Re-Type ",
                        type: "password",
                        bsClass: "form-control",
                        name:"employee_retype_password",
                        value:this.state.employee_retype_password,
                        onChange: this.handleChange
                        }

                    ]}
                    />
                    <Button pullRight bsStyle="success" fill type="submit"> <i className="pe-7s-diskette" /> Save</Button>
                    <div className="clearfix" />
                </form>
                }
            />
            
            </Col>
        </Row>
        </Grid>
        <SuccessDialog
          open={this.state.open}
          handleClose={() => this.setState({ open: false })}
          success={this.state.success}
          isLoading={this.state.isLoading}
          action={this.state.action}
        />
    </div>
    );
}
}

export default NewPO;
