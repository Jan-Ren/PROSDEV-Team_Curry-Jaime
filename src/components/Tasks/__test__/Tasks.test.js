import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './../Tasks';
import { render } from "@testing-library/react";

    describe("Tasks component render check", () => {
        it("Tasks component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<Tasks> </Tasks>, div) //use ReactDOM function to render
        });
    });
