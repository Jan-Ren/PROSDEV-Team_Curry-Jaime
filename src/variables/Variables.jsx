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
//
// //
// // // For notifications
// //
//
var defaultWidth =
  window.screen.width > 768
    ? (window.screen.width * 1) / 3
    : window.screen.width;

var style = {
  Wrapper: {},
  Containers: {
    DefaultStyle: {
      position: "fixed",
      width: defaultWidth,
      padding: "10px 10px 10px 20px",
      zIndex: 9998,
      WebkitBoxSizing: "",
      MozBoxSizing: "",
      boxSizing: "",
      height: "auto",
      display: "inline-block",
      border: "0",
      fontSize: "14px",
      WebkitFontSmoothing: "antialiased",
      fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
      fontWeight: "400",
      color: "#FFFFFF"
    },

    tl: {
      top: "0px",
      bottom: "auto",
      left: "0px",
      right: "auto"
    },

    tr: {
      top: "0px",
      bottom: "auto",
      left: "auto",
      right: "0px"
    },

    tc: {
      top: "0px",
      bottom: "auto",
      margin: "0 auto",
      left: "50%",
      marginLeft: -(defaultWidth / 2)
    },

    bl: {
      top: "auto",
      bottom: "0px",
      left: "0px",
      right: "auto"
    },

    br: {
      top: "auto",
      bottom: "0px",
      left: "auto",
      right: "0px"
    },

    bc: {
      top: "auto",
      bottom: "0px",
      margin: "0 auto",
      left: "50%",
      marginLeft: -(defaultWidth / 2)
    }
  },

  NotificationItem: {
    DefaultStyle: {
      position: "relative",
      width: "100%",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "14px",
      margin: "10px 0 0",
      padding: "10px",
      display: "block",
      WebkitBoxSizing: "border-box",
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
      opacity: 0,
      transition: "all 0.5s ease-in-out",
      WebkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      willChange: "transform, opacity",

      isHidden: {
        opacity: 0
      },

      isVisible: {
        opacity: 1
      }
    },

    success: {
      borderTop: 0,
      backgroundColor: "#a1e82c",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    error: {
      borderTop: 0,
      backgroundColor: "#fc727a",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    warning: {
      borderTop: 0,
      backgroundColor: "#ffbc67",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    },

    info: {
      borderTop: 0,
      backgroundColor: "#63d8f1",
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0
    }
  },

  Title: {
    DefaultStyle: {
      fontSize: "30px",
      margin: "0",
      padding: 0,
      fontWeight: "bold",
      color: "#FFFFFF",
      display: "block",
      left: "15px",
      position: "absolute",
      top: "50%",
      marginTop: "-15px"
    }
  },

  MessageWrapper: {
    DefaultStyle: {
      marginLeft: "55px",
      marginRight: "30px",
      padding: "0 12px 0 0",
      color: "#FFFFFF",
      maxWidthwidth: "89%"
    }
  },

  Dismiss: {
    DefaultStyle: {
      fontFamily: "inherit",
      fontSize: "21px",
      color: "#000",
      float: "right",
      position: "absolute",
      right: "10px",
      top: "50%",
      marginTop: "-13px",
      backgroundColor: "#FFFFFF",
      display: "block",
      borderRadius: "50%",
      opacity: ".4",
      lineHeight: "11px",
      width: "25px",
      height: "25px",
      outline: "0 !important",
      textAlign: "center",
      padding: "6px 3px 3px 3px",
      fontWeight: "300",
      marginLeft: "65px"
    },

    success: {
      // color: '#f0f5ea',
      // backgroundColor: '#a1e82c'
    },

    error: {
      // color: '#f4e9e9',
      // backgroundColor: '#fc727a'
    },

    warning: {
      // color: '#f9f6f0',
      // backgroundColor: '#ffbc67'
    },

    info: {
      // color: '#e8f0f4',
      // backgroundColor: '#63d8f1'
    }
  },

  Action: {
    DefaultStyle: {
      background: "#ffffff",
      borderRadius: "2px",
      padding: "6px 20px",
      fontWeight: "bold",
      margin: "10px 0 0 0",
      border: 0
    },

    success: {
      backgroundColor: "#a1e82c",
      color: "#ffffff"
    },

    error: {
      backgroundColor: "#fc727a",
      color: "#ffffff"
    },

    warning: {
      backgroundColor: "#ffbc67",
      color: "#ffffff"
    },

    info: {
      backgroundColor: "#63d8f1",
      color: "#ffffff"
    }
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0
    }
  }
};

//
// //
// // // For tables
// //
//
const prfHArray = ["PRF#", "Recipient", "Paid Date", "Date Created", "Last Modified", "Actions"];
const prfDArray = [
  ["850532", "07/20/2020", "Aaron", "07/19/20", "", ""],
  ["850533", "07/21/2020", "Iris", "07/20/20", "", ""],
  ["850534", "07/22/2020", "Janren", "07/21/20", "", ""],
  ["850535", "07/23/2020", "Jerick", "07/22/20", "", ""],
  ["850536", "07/24/2020", "Jitsu", "07/23/20", "", ""],
  ["850537", "07/25/2020", "Rollo", "07/24/20", "", ""],
];

const poHArray = ["PO#", "Recipient", "Paid Date","PRF#", "Date Created", "Last Modified", "Actions"];
const poDArray = [
  ["117620", "07/20/2020", "Aaron", "07/19/20", "850532", "", ""],
  ["117117", "07/21/2020", "Aaron", "07/18/20","850532", "", ""],
  ["117118", "07/21/2020", "Iris", "07/20/20","850533", "", ""],
  ["117120", "07/22/2020", "Janren", "07/21/20","850534", "", ""],
  ["117300", "07/23/2020", "Jerick", "07/22/20","850535", "", ""],
  ["117115", "07/24/2020", "Jitsu", "07/23/20","850536", "", ""],
  ["117146", "07/25/2020", "Rollo", "07/24/20","850537", "", ""],
];
const grossHArray = ["PRF#", "Date Created", "Paid Date", "PRF Amount", "PO Amount", "Gross"];
const grossDArray = [["850532", "07-25-2020", "07-25-2020", "0.00", "10,000", "-10000"]];

const poList = ["PO List"];
const poFolder =[["220"],["219"],["218"],];

const prfList = ["PRF List"];
const prfFolder =[["220"],["219"],["218"],];

module.exports = {
  style, // For notifications (App container and Notifications view)
  prfHArray,
  prfDArray,
  poHArray,
  poDArray, // For tables (TableList view)
  poList,
  poFolder,
  prfList,
  prfFolder,
  grossHArray,
  grossDArray
};
