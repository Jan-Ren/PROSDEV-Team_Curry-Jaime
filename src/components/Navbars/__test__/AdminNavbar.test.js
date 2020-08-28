import React from 'react';
import ReactDOM from 'react-dom';
import AdminNavbar from './../AdminNavbar';
import { render } from "@testing-library/react";

    describe("AdminNavbar component render check", () => {
        it("AdminNavbar component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<AdminNavbar> </AdminNavbar>, div) //use ReactDOM function to render
        });
    });
