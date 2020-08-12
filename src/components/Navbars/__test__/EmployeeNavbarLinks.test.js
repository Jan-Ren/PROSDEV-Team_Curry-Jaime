import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeNavbarLinks from './../EmployeeNavbarLinks';
import { render } from "@testing-library/react";

    describe("EmployeeNavbarLinks component render check", () => {
        it("EmployeeNavbarLinks component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<EmployeeNavbarLinks> </EmployeeNavbarLinks>, div) //use ReactDOM function to render
        });
    });
