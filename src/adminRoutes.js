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

import AdminPOListFolders from "views/AdminPOList.jsx";
import AdminPRFListFolders from "views/AdminPRFList.jsx";
import AdminCancelledPO from "views/AdminCancelledPO.jsx";
import AdminCancelledPRF from "views/AdminCancelledPRF.jsx";
import GrossIncomeRep from "views/GrossIncomeReport.jsx";
import Settings from "views/Settings.jsx";
import Login from "./components/Login/login.component.js";
import NewPRF from "views/NewPRF.jsx";

const adminDashboardRoutes = [
  {
    path: "/PRF-List-Folders",
    name: "PRF List Folders",
    icon: "pe-7s-note2",
    component: AdminPRFListFolders,
    layout: "/admin"
  },
  {
    path: "/PO-List-Folders",
    icon: "pe-7s-news-paper",
    name: "PO List Folders",
    component: AdminPOListFolders,
    layout: "/admin"
  },
  {
    NewPRF: true,
    path: "/New-PRF",
    name: "New PRF ",
    icon: "pe-7s-plus",
    component: NewPRF,
    layout: "/create"
  },
  {
    NewPRF: true,
    path: "/Cancelled-PRF",
    name: " Cancelled PRF",
    icon: "pe-7s-note2",
    component: AdminCancelledPRF,
    layout: "/admin"
  },
  {
    NewPRF: true,
    path: "/Cancelled-PO",
    name: "  Cancelled PO ",
    icon: "pe-7s-news-paper",
    component: AdminCancelledPO,
    layout: "/admin"
  },
  {
    path: "/Gross-Income-Report",
    name: " Gross Income Report ",
    component: GrossIncomeRep,
    icon: "pe-7s-graph1",
    layout: "/admin"
  },
  {
    path: "/Settings",
    name: " Settings ",
    component: Settings,
    icon: "pe-7s-config",
    layout: "/admin"
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

export default adminDashboardRoutes;
