import React from 'react';
import ReactDOM from 'react-dom';
import AdminNavbarLinks from './../AdminNavbarLinks';
import { render } from "@testing-library/react";

    describe("AdminNavbarLinks component render check", () => {
        it("AdminNavbarLinks component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<AdminNavbarLinks> </AdminNavbarLinks>, div) //use ReactDOM function to render
        });
    });
