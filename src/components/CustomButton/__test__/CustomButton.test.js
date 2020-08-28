import React from 'react';
import ReactDOM from 'react-dom';
import CustomButton from './../CustomButton';
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";


    describe("CustomButton render check", () => {
        it("CustomButton renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component (CustomButton) to the div
            ReactDOM.render(<CustomButton> </CustomButton>, div) //use ReactDOM function to render
        });
    });

