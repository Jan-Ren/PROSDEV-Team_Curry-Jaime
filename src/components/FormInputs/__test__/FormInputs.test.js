import React from 'react';
import ReactDOM from 'react-dom';
import FormInputs from './../FormInputs';
import { render } from "@testing-library/react";

    describe("FormInputs component render check", () => {
        it("FormInputs component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<FormInputs> </FormInputs>, div) //use ReactDOM function to render
        });
    });
