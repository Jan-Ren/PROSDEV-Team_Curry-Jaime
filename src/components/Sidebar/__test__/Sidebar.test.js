import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './../Sidebar';
import { render } from "@testing-library/react";

    describe("Sidebar component render check", () => {
        it("Sidebar component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<Sidebar> </Sidebar>, div) //use ReactDOM function to render
        });
    });
