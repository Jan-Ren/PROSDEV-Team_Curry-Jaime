import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeNavbar from './../EmployeeNavbar';
import { render } from "@testing-library/react";

    describe("EmployeeNavbar component render check", () => {
        it("EmployeeNavbar component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<EmployeeNavbar> </EmployeeNavbar>, div) //use ReactDOM function to render
        });
    });
