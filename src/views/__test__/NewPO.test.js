import * as React from 'react';
import NewPO from './../NewPO';
import { fireEvent, render, screen, wait } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import * as renderer from 'react-test-renderer';

const mockSave = (NewPO.handleSave = jest.fn()); 

    describe("NewPO view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<BrowserRouter> <NewPO/> </BrowserRouter>);
        });
    });

    // describe("Snapshot testing for NewPO view", () => {
    //     test("smileeeee :D", () => {
    //             const tree = renderer
    //               .create(<BrowserRouter> <NewPO/> </BrowserRouter>)
    //               .toJSON();
    //             expect(tree).toMatchSnapshot();
              
    //     });
    // });

   describe("As an employee, I want to be able to save the PO", () => {
        test("Create New PO", async ()=>{
            const { getByText, getByLabelText } = render( <BrowserRouter> 
            <NewPO/> 
            </BrowserRouter>
            );
            // tests the functionality of the handleSave function from NewPO.jsx

            const inputRecipient = screen.getByPlaceholderText("Recipient");
            const inputPax = screen.getByPlaceholderText("Input Name");
            const inputParticulars = screen.getByPlaceholderText("Input Particulars");

            //added some input values to test them as well > u <

            const savePOButton = screen.getByText("Save");

            fireEvent.change(inputRecipient, {target:{value:"Recipient"}});
            expect(inputRecipient).toHaveValue("Recipient");

            fireEvent.change(inputPax, {target:{value:"Pax"}});
            expect(inputPax).toHaveValue("Pax");

            fireEvent.change(inputParticulars, {target:{value:"Particulars"}});
            expect(inputParticulars).toHaveValue("Particulars");
            
            fireEvent.click(savePOButton);

            //assertion
            expect(mockSave).toHaveBeenCalledTimes(1);
            await wait(() => mockSave);

        });
   });