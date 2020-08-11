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
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { prfHArray, prfDArray } from "variables/Variables.jsx";

import DateInput from "components/DatePicker/DatePicker.jsx"
import api from '../api'
import moment from 'moment'

class PRFTableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        PRF: [],
        columns: [],
        isLoading: false,
    }    
  }
  
  componentDidMount = async () => {
    this.setState({ isLoading: true })
    
    await api.getAllPRF().then(PRF => {
        this.setState({
            PRF: PRF.data.data,
            isLoading: false,
        })
    })
    
    window.alert(this.state.PRF)
    console.log(this.state.PRF)

    
    // to check if na-receive yung data
    // setTimeout(() => {
    //   window.alert(this.state.PRF)
    //   window.alert(this.state.PRF)
    //   console.log(this.state.PRF)
    // }, 3000)
  }

//   render() {
//     const { PRF, isLoading } = this.state
//     console.log('TCL: PRFTableList -> render -> PRF', PRF)

//     const columns = [
//         {
//             Header: 'ID',
//             accessor: '_id',
//             filterable: true,
//         },
//         {
//             Header: 'Name',
//             accessor: 'name',
//             filterable: true,
//         },
//         {
//             Header: 'Rating',
//             accessor: 'rating',
//             filterable: true,
//         },
//         {
//             Header: 'Time',
//             accessor: 'time',
//             Cell: props => <span>{props.value.join(' / ')}</span>,
//         },
//     ]

//     let showTable = true
//     if (!PRF.length) {
//         showTable = false
//     }

//     return (
//         <Wrapper>
//             {showTable && (
//                 <ReactTable
//                     data={PRF}
//                     columns={columns}
//                     loading={isLoading}
//                     defaultPageSize={10}
//                     showPageSizeOptions={true}
//                     minRows={0}
//                 />
//             )}
//         </Wrapper>
//     )
// }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="PRF List"
                category="Dates"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <React.Fragment>
                  <Col md={3}><DateInput/></Col>
                  
                  <Table striped hover>
                    <thead>
                      <tr>
                        {prfHArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.PRF.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td key={key+1}>{prop.prf_number}</td>;
                            <td key={key+2}>{prop.recipient}</td>;
                            <td key={key+3}>{moment(prop.date_created).format('DD-MM-YYYY')}</td>;
                            <td key={key+4}>{moment(prop.date_created).format('DD-MM-YYYY hh:mm:ss A')}</td>;
                            <td key={key+5}>{moment(prop.last_modified).format('DD-MM-YYYY hh:mm:ss A')}</td>;
                            {/* {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })} */}
                            <td>
                                <Button variant="outline-primary" bsStyle="danger"><i className="pe-7s-close-circle"/></Button>{' '}
                                <></>
                                <Button variant="outline-primary" bsStyle="primary" href="/employee/New-PO"><i className="pe-7s-news-paper" /> New PO</Button>{' '}
                                <></>
                                <Button variant="outline-secondary"><Link to={{pathname: '/employee/New-PRF', state: {PRF: prop} }} ><i className="pe-7s-look" />View</Link></Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    
                  </Table>
                  </React.Fragment>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PRFTableList;
