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

    if (this.props.location.state) {
      console.log(this.props.location.state.PRF)
      alert('waw')
      const { prf_number, pax, recipient, particulars, php, usd, total, conversion_rate, prepared_by, approved_by, received_by} = props.location.state.PRF
      this.state = {
          prf_number,
          pax,
          recipient,
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
    this.setState({pax: [...this.state.pax, ""]})
  }
  handleChange(e){
    e.preventDefault()
    const {name, value} = e.target

    if (name.includes('pax')) {
      const index = name.replace("pax", "")
      
      const pax = [...this.state.pax]
      pax[index] = value
      this.setState({
        pax: pax
      }, () => { console.log(this.state.pax[index])})
    } else {
       this.setState( {
        [name]: value
       }, () => { 
         console.log(this.state[name]) 

         if (name === 'usd' || name === 'php' || name === 'conversion_rate') {
          const { usd, php, conversion_rate } = this.state
          
          let total = 0
          if (usd !== '' && php !== '' && conversion_rate !== '') {
            total = (parseFloat(usd) * parseFloat(conversion_rate)) + parseFloat(php)
          } else if (usd === '' || conversion_rate === '') {
            if (php !== '')
              total = parseFloat(php)
          } else {
            if (usd !== '' && conversion_rate !== '')
              total = (parseFloat(usd) * parseFloat(conversion_rate))
          } 
          
          this.setState({ total: total })

         }
        }) 
      }
    
  }

  handleRemove(index){
    this.state.pax.splice(index,1)
    this.setState({pax: this.state.pax})

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

    // const { prf_number, pax, recipient, particulars, php, usd, conversion_rate, total, prepared_by, approved_by, received_by } = this.state
    const payload = this.state
    alert('here')
    console.log(this.state)
    if (this.props.location.state) {
      const prf_id = this.props.location.state.PRF._id
      try {
        await api.updatePRFById(prf_id, payload).then(res => {
          window.alert(`Edit succesfully: ${res.message}`)
          this.setState({
            prf_number: '',
            pax: [''],
            recipient: '',
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
        alert("edit done")
      } catch (error) {
        console.log(error.message)
        alert(`Editing failed: ${error.message}`)
      }

    } else {
      alert("saving please wait")
      try {
        await api.insertPRF(payload).then(res => {   
          window.alert(res.message)
          this.setState({
            prf_number: '',
            pax: [''],
            recipient: '',
            particulars: '',
            conversion_rate: 0,
            php: 0,
            usd: 0,
            total: 0,
            prepared_by: '',
            approved_by: '',
            received_by: ''
          })

          alert("saving done")
        })
      } catch (error) {
        console.log(error.message)
        alert(error.message)
      }
    }
    alert("pumasok ba")
    
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
                      ncols={["col-md-3", "col-md-6"]}
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
                          placeholder: "Recipient",
                          defaultValue: "",
                          name:`recipient`,
                          value:this.state.recipient,
                          onChange: this.handleChange
                        }
                      ]}
                                            
                      />
                      
                      {/* <FormInputs
                      ncols={["col-md-3","col-md-5",  "col-md-3"]}
                      properties={[
                        {
                          label: "Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Email",
                          name:`paid_date`,
                          value:this.state.paid_date,
                          onChange: this.handleChange
                        }
                      ]}
                    /> */}
                    <h5>Pax Name/s</h5>
                    {/* <FormInputs
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
                    /> */}
                                        
                    {
                      this.state.pax.map((pax, index)=>{
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
                                value:this.state.pax[index],
                                onChange: this.handleChange
                              }
                            ]}
                            
                          />
                          {
                            index==0 ? <Button variant="outline-secondary" bsStyle="primary" fill onClick={(e)=>this.addName(e)}>+</Button> :
                            <Button variant="outline-secondary" bsStyle="danger"  onClick={(e)=>this.handleRemove(e)}>-</Button>
                          }
                          
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
                            value={this.state.particulars}
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
                          readOnly: true,
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
                          value: this.state.prepared_by,
                          name:"prepared_by",
                          onChange: this.handleChange
                        },
                        {
                          label: "Approved By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: "",
                          value: this.state.approved_by,
                          name: "approved_by",
                          onChange: this.handleChange
                        },
                        {
                          label: "Received By:",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Name",
                          defaultValue: "",
                          value: this.state.received_by,
                          name: "received_by",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    
                    <Button pullRight bsStyle="info"  fill type="submit"> Save PRF </Button>
                    <Button pullRight bsStyle="danger" fill > Cancel </Button>
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
