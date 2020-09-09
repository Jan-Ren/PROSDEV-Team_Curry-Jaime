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
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from '../api'
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import users from "api/users";
import { white } from "material-ui/styles/colors";

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
      color: white,
    },
    color: white,
    borderColor: white
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class NewPRF extends Component {

  constructor(props) {
    super(props)

    this.state = {
      prf_number: '',
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
      prf_folder: '',
      success: false,
      isLoading: false,
      open: false
    }    
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount = async() => {
    // edit PRF
    if (this.props.location.state) {
      console.log(this.props.location.state.PRF)
      // alert('waw')
      const { prf_number, pax, recipient, particulars, php, usd, total, conversion_rate, prepared_by, approved_by, received_by} = this.props.location.state.PRF
      this.setState({
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
      })
    } 
    
    // new PRF
    else {
      const prf_number = await this.getCurrentPRF()
    
      console.log(prf_number)
      // alert(prf_number)
      console.log(this.props.location)
      // alert('daz weird')
      this.setState({
          prf_number,
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
      })
    }
  }
  
  getCurrentPRF = async () => {
    const token = window.localStorage.getItem('token')
    
    console.log(token)
    try {
      
      const user = await (await users.getUser({token})).data.data
      
      const workingDirectory = await (await api.getNF_PRFById(user.prf_folder)).data.data
      this.setState({ prf_folder: workingDirectory }, () => console.log(this.state.prf_folder))
      return (workingDirectory.nf_prf_number*1000) + workingDirectory.prf.length

    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  handleClose = (e) => {
    this.setState({ success:false });
    window.history.go(-1)
  };

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

  handleRemove(e, index){
    e.preventDefault()
    this.state.pax.splice(index,1)
    this.setState({pax: this.state.pax})

  }
  handleSave = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true, open: true })
    const payload = {...this.state}
    payload.prf_folder = this.state.prf_folder._id
    // alert('here')
    
    // edit PRF
    if (this.props.location.state) {
      const { _id, date_created } = this.props.location.state.PRF
      payload.date_created = date_created

      try {
        // alert('editing please wait')
        await api.updatePRFById(_id, payload)

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

        // alert("edit done")
      } catch (error) {
        console.log(error.message)
        alert(`Editing failed: ${error.message}`)
      }
      
    } 
    
    // new PRF
    else {
      console.log(this.state)
      // alert("saving please wait")      
      try {
        const prf_id = await (await api.insertPRF(payload)).data.id
        const { prf_folder } = this.state
        console.log(prf_folder)
        // alert(prf_folder)
        prf_folder.prf.push(prf_id)
        await api.updateNF_PRFById(prf_folder._id, prf_folder)
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
          received_by: '',
        })
        
        // alert("saving done")
        
      } catch (error) {
        console.log(error.message)
        alert(error.message)
      }
    }
    setTimeout(() => {
      this.setState({ isLoading: false, success: true })    
    }, 1500)
  }
  render() {
    const { classes } = this.props;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: this.state.success,
    });
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="New PRF"
                content={
                  <form onSubmit={this.handleSave.bind(this)}>
                    
                    <FormInputs
                      ncols={["col-md-3", "col-md-6"]}
                      properties={[
                        {
                          label: "PRF#",
                          type: "disabled",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: "",
                          name:"prf_number",
                          value:this.state.prf_number,
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
                      
                    <h5 style={{ display: "inline-block" }}>Pax Name/s</h5> <Button variant="outline-secondary" bsStyle="primary" fill onClick={(e)=>this.addName(e)}>+</Button>
                                        
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
                            // index==0 ? <Button variant="outline-secondary" bsStyle="primary" fill onClick={(e)=>this.addName(e)}>+</Button> :
                            <Button variant="outline-secondary" bsStyle="danger"  onClick={(e)=>this.handleRemove(e, index)}>-</Button>
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
                    <Button pullRight bsStyle="primary" fill type="submit"> Save </Button>
                    <Button pullRight bsStyle="danger" fill onClick={this.props.history.goBack}> Back </Button>
                    
                    <div className="clearfix" />
                  </form>
                }
              />
              
              {/* <Backdrop className={classes.backdrop} open={this.state.isLoading}>
                <CircularProgress color="inherit" />
              </Backdrop> */}
              <Dialog 
                open={this.state.open} 
                maxWidth={'sm'}
                onClose={this.handleClose}
              >
                <DialogTitle id="alert-dialog-title" >{"Message"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                    
                    <div className={classes.root}>
                      <div className={classes.wrapper}>
                        <Fab
                          aria-label="save"
                          color="inherit"
                          className={buttonClassname}
                          onClick={this.handleClose}
                        >
                          {this.state.success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {this.state.isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                      </div>
                      {this.state.isLoading ? '' : 'Saved Successfully'}
                    </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {/* <Button onClick={this.handleClose} className={classes.} autoFocus>
                      Okay
                    </Button> */}
                    <div className={classes.root}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="inherit"
                          className={buttonClassname}
                          disabled={this.state.isLoading}
                          onClick={this.handleClose}
                          >
                          Okay
                        </Button>
                        {this.state.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </div>
                  </DialogActions>
              </Dialog>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(NewPRF);
