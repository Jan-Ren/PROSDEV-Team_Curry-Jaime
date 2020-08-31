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

import POLists from "views/POTableList.jsx";
import PRFList from "views/PRFTableList.jsx";
import Login from "./components/Login/login.component.js";
import NewPRF from "views/NewPRF.jsx";

const dashboardRoutes = [
  {
    path: "/PRF-List",
    name: "PRF List",
    icon: "pe-7s-note2",
    component: PRFList,
    layout: "/employee"
  },
  {
    path: "/PO-List",
    name: "PO List",
    icon: "pe-7s-news-paper",
    component: POList,
    layout: "/employee"
  },
  {
    path: "New-PRF",
    name: "New PRF ",
    icon: "pe-7s-plus",
    component: NewPRF,
    layout: "/create"
  },
  {
    logout: true,
    path: "/",
    name: "Logout",
    icon: "pe-7s-attention",
    component: Login, 
    layout:""
  },
  
];

export default dashboardRoutes;
