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
        prf_number: 800033,
        pax:[''],
        recepient: '',
        paid_date: '',
        particulars: '',
        php: 0,
        usd: 0,
        total: 0,
        conversion_rate: 0,
        prepared_by: '',
        approved_by: '',
        received_by: '',
        PAXNames:[]
    }
    if (this.props.location.state) {
      console.log(this.props.location.state.PRF)
      alert('waw')
      const { prf_number, pax, recipient, paid_date, particulars, php, usd, total, conversion_rate, prepared_by, approved_by, received_by} = props.location.state.PRF
      this.state = {
          prf_number,
          pax,
          recipient,
          paid_date,
          particulars,
          php,
          usd,
          total,
          conversion_rate,
          prepared_by,
          approved_by,
          received_by
      }
    } else {
      console.log(this.props.location)
      alert('daz weird')
      this.state = {
          prf_number: 800033,
          pax:[''],
          recipient: '',
          paid_date: '',
          particulars: '',
          php: 0,
          usd: 0,
          total: 0,
          conversion_rate: 0,
          prepared_by: '',
          approved_by: '',
          received_by: '',      
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  

  addName(){
    this.setState({PAXNames: [...this.state.PAXNames, ""]})
  }
  handleChange(e, index){
    this.state.PAXNames[index] = e.target.value
    this.setState({PAXNames:this.state.PAXNames})
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

    const { prf_number, pax, recepient, paid_date, particulars, php, usd, conversion_rate, total, prepared_by, approved_by, received_by } = this.state
    const payload = { prf_number, pax, recepient, paid_date, particulars, php, usd, conversion_rate, total, prepared_by, approved_by, received_by }
    alert('here')
    console.log(this.state)
    try {
      await api.insertPRF(payload).then(res => {   
        window.alert(res.message)
        this.setState({
          prf_number: '',
          pax: [''],
          recepient: '',
          paid_date: '',
          particulars: '',
          conversion_rate: 0,
          php: 0,
          usd: 0,
          total: 0,
          prepared_by: '',
          approved_by: '',
          received_by: ''
        })
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
                title="New PRF"
                content={
                  <form>
                    
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
                      ]}
                                            
                      // value={this.state.prf_number}
                      />
                      <FormInputs
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
                          placeholder: "Email"
                        }
                      ]}
                    />
                    <h5>Pax Name/s</h5>
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Input Name",
                          defaultValue: ""
                        }
                      ]}
                    />
                    
                    <Button variant="outline-secondary" bsStyle="primary" fill onClick={(e)=>this.addName(e)}>+</Button>
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
                                defaultValue: ``,
                                name:`pax${index}`,
                                onChange: this.handleChange
                              }
                            ]}
                            onChange={(e)=>this.handleChange(e,index)}
                            value={PAXNames}
                          />
                          <Button variant="outline-secondary" bsStyle="danger"  onClick={(e)=>this.handleRemove(e)}>-</Button>
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
                          defaultValue:"",
                          step:"0.01",
                          value:this.state.conversion_rate,
                          name: "conversion_rate",
                          onChange: this.handleChange
                        },
                        {
                          label: "US $",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Input Amount",
                          defaultValue: "",
                          value:this.state.usd,
                          name: "usd",
                          step: "0.01",
                          onChange: this.handleChange
                        },
                        {
                          label: "PHP",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TOTAL AMOUNT",
                          defaultValue: "",
                          value:this.state.php,
                          name: "php",
                          step: "0.01",
                          onChange: this.handleChange
                        },
                        {
                          label: "Total",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "TOTAL AMOUNT",
                          defaultValue: "",
                          value: this.state.total,
                          name: "total",
                          step: "0.01",
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
