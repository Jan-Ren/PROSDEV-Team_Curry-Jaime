import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './../Footer';
import { render } from "@testing-library/react";

    describe("Footer component render check", () => {
        it("Footer component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<Footer> </Footer>, div) //use ReactDOM function to render
        });
    });
