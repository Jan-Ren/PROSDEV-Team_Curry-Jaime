import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './../DatePicker';
import { render } from "@testing-library/react";

    describe("DatePicker component render check", () => {
        it("DatePicker component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component (login) to the div
            ReactDOM.render(<DatePicker> </DatePicker>, div) //use ReactDOM function to render
        });
    });