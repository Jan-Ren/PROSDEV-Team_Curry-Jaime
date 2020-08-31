import * as React from 'react';
import PRFTableList from './../PRFTableList';
import { render, wait } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

//const mockMount = (PRFTableList.componentDidMount = jest.fn()); //check if data is retrieved

    describe("PRFTableList view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<BrowserRouter>
            <PRFTableList/>
            </BrowserRouter>);
        });
    });

    // describe("As an employee, I want to be able to see the details I previously inputted on the PRF", () => {
    //     test("Check current PRFs if viewable", async ()=> {
    //         const { getByText, getByLabelText } = render(<BrowserRouter>
    //         <PRFTableList ptl = {mockMount}/>
    //         </BrowserRouter>);

    //         // wait for componentDidMount, which checks if data was receieved
    //         await wait (()=> ptl);
    //     });
    // });