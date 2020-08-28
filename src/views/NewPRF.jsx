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
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from '../api'


class NewPRF extends Component {
  constructor(props) {
    super(props)

    this.state = {
        // name: 'Sample Name',
        // rating: '9.0',
        // time: '24:00',
        // firstNames:[],
        // lastNames:[]
        prf_number: '',
        pax: '',
        recepient: '',
        paid_date: '',
        particulars: '',
        php: '',
        usd: '',
        total: '',
        prepared_by: '',
        approved_by: '',
        received_by: '',
        PAXNames:[]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // state = {
  //   firstNames:[],
  //   lastNames:[]
  // }

  addName(){
    this.setState({PAXNames: [...this.state.PAXNames, ""]})
  }

  handleChange(e, index){
    e.preventDefault()
    // console.log(e.target.name)
    const {name, value} = e.target
    // alert(this.state['approved_by'])
    // alert(name)
    if (name === 'PAXNames') {
      this.state.PAXNames[index] = e.target.value
      this.setState({PAXNames:this.state.PAXNames})
    } else {
       this.setState( {
        [name]: value
       }, () => { console.log(this.state[name]) }) 
    }    
    
  }
  handleRemove(index){
    this.state.PAXNames.splice(index,1)
    this.setState({PAXNames: this.state.PAXNames})

  }
  handleSave = async () => {

    // const { name, rating, time } = this.state
    // const arrayTime = time.split('/')
    // const payload = { name, rating, time: arrayTime }    

    // await api.insertPRF(payload).then(res => {
    //     window.alert(`Movie inserted successfully`)
    //     this.setState({
    //         name: '',
    //         rating: '',
    //         time: '',
    //     })
    // })
    // console.log(this.state)

    const { prf_number, pax, recepient, paid_date, particulars, php, usd, total, prepared_by, approved_by, received_by } = this.state
    const payload = { prf_number, pax, recepient, paid_date, particulars, php, usd, total, prepared_by, approved_by, received_by }
    alert('here')
    try {
      await api.insertPRF(payload).then(res => {   
        window.alert(res.message)
        this.setState({
          prf_number: '',
          pax: '',
          recepient: '',
          paid_date: '',
          particulars: '',
          php: '',
          usd: '',
          total: '',
          prepared_by: '',
          approved_by: '',
          received_by: ''
        })
      })
    } catch (error) {
      console.log(error)
      alert(error)
    }
    
    
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="New PRF"
                content={
                  <form onSubmit={this.handleSave}>
                    <FormInputs
                      ncols={["col-md-3","col-md-5",  "col-md-3"]}
                      properties={[
                        {
                          label: "PRF#",
                          type: "disabled",
                          bsClass: "form-control",
                          placeholder: "800033",
                          defaultValue: "",
                          name:"prf_number",
                          onChange: this.handleChange,
                          plaintext: true,
                          readOnly: true
                        },
                        {
                          label: "To",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Recepient",
                          defaultValue: "",
                          name:"recepient",
                          onChange: this.handleChange
                        },
                        {
                          label: "Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Email",
                          name:"paid_date",
                          onChange: this.handleChange
                        }
                      ]}
                                            
                      // value={this.state.prf_number}
                      />
                      {/* <FormInputs
                      ncols={["col-md-3","col-md-5",  "col-md-3"]}
                      properties={[
                        {
                          label: "To",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Recepient",
                          defaultValue: "",
                        },
                      ]}
                      name="PRF_number"
                      onChange={(e)=>this.handleChange(e)}
                      value={this.state.prf_number}
                      />
                      <FormInputs
                      ncols={["col-md-3","col-md-5",  "col-md-3"]}
                      properties={[
                        {
                          label: "Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Email",
                        }
                      ]}
                      name="PRF_number"
                      onChange={(e)=>this.handleChange(e)}
                      value={this.state.prf_number}
                      /> */}
                    <h5>Pax Name/s</h5>
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Input Name",
                          defaultValue: "",
                          name: "pax",
                          onChange: this.handleChange
                        }
                      ]}
                      // onChange={(e)=>this.handleChange(e)}
                      
                    />
                    
                    <Button variant="outline-secondary" onClick={(e)=>this.addName(e)}>+</Button>
                    {
                      this.state.PAXNames.map((PAXNames, index)=>{
                        return(
                          <div key={index}>
                            <FormInputs
                            ncols={["col-md-6"]}
                            properties={[
                              {
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Input Name",
                                defaultValue: ""
                              }
                            ]}
                            onChange={(e)=>this.handleChange(e,index)}
                            value={PAXNames}
                          />
                          <Button variant="outline-secondary" onClick={(e)=>this.handleRemove(e)}>-</Button>
                          </div>
                        )
                      })
                    }

                    <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Particulars</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Input Particulars"
                            defaultValue=""
                            name="particulars"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                    </Col>

                      <FormInputs
                      ncols={["col-md-3","col-md-3","col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "US$ to PHP",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue:""
                        },
                        {
                          label: "US $",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue: "",
                          name: "usd",
                          onChange: this.handleChange
                        },
                        {
                          label: "PHP",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TOTAL AMOUNT",
                          defaultValue: "",
                          name: "php",
                          onChange: this.handleChange
                        },
                        {
                          label: "Total",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TOTAL AMOUNT",
                          defaultValue: "",
                          name: "total",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4","col-md-4","col-md-4"]}
                      properties={[
                        {
                          label: "Prepared By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue:"",
                          name:"prepared_by",
                          onChange: this.handleChange
                        },
                        {
                          label: "Approved By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: "",
                          name: "approved_by",
                          onChange: this.handleChange
                        },
                        {
                          label: "Received By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: "",
                          name: "received_by",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    
                    <Button pullRight bsStyle="info"  fill type="submit"> Save PRF </Button>
                    <Button pullRight bsStyle="danger" fill type="submit"> Cancel </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default NewPRF;
