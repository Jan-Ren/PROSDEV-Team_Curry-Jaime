import React from 'react';
import ReactDOM from 'react-dom';
import Login from './../login.component';
import { render } from "@testing-library/react";

    describe("Login render check", () => {
        it("login page renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component (login) to the div
            ReactDOM.render(<Login> </Login>, div) //use ReactDOM function to render
        });
    });
