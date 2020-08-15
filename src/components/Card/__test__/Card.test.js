import React from 'react';
import ReactDOM from 'react-dom';
import Card from './../Card';
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";

    describe("Card render check", () => {
        it("Card renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component (card) to the div
            ReactDOM.render(<Card> </Card>, div) //use ReactDOM function to render
        });
    });
    