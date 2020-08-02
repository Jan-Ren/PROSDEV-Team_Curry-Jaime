import React from 'react';
import ReactDOM from 'react-dom';
import Login from './../login.component';
import '@testing-library/jest-dom/extend-expect';

    describe("Login render check", () => {
        it("login page renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component (login) to the div
            ReactDOM.render(<Login> </Login>, div) //use ReactDOM function to render
        });
    });
    