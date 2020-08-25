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
import {Redirect} from "react-router-dom";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { poFolder } from "variables/Variables.jsx";

const options = {
    // ---------------------------------
    // detects click on each row
    //---------------------------------
    onRowClick: function(row) {

    }
};

class AdminPOListFolders extends Component {

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
                            {poFolder.map((prop, key) => {
                                return (
                                <tr key={key}>
                                    {prop.map((prop, key) => {
                                    return <td key={key} onRowClick={() => {
                                        return <Redirect path="/employee/PO/{}"/>
                                }}>{prop}</td>;
                                    })}
                                    
                                    <td>
                                    <Button variant="outline-secondary" bsStyle="danger" className="pull-right"><i className="pe-7s-close-circle"/></Button>
                                    <Button variant="outline-secondary" bsStyle="primary" className="pull-right"><i className="pe-7s-folder"/>Set as Working Directory</Button>
                                    <Button className="pull-right" href="/admin/PRF-List"><i className="pe-7s-look"/>View</Button>
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

export default AdminPOListFolders;