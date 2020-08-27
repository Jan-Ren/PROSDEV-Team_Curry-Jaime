import * as React from 'react';
import NewPRF from './../NewPRF';
import { fireEvent, render, screen, wait } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

const mockCancel = (NewPRF.handleRemove = jest.fn());
const mockNewPRF = (NewPRF.handleSave = jest.fn());

    describe("NewPRF view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<BrowserRouter> <NewPRF/> </BrowserRouter>);
        });
    });

    describe("As an employee, I want to be able to cancel the creation",  () => {
        test("Cancel New PRF", async ()=>{

            // tests the functionality of the handleRemove function from NewPRF.jsx

            const { getByText, getByLabelText } = render( <BrowserRouter> 
            < NewPRF/> 
            </BrowserRouter>
            );
            const cancelButton = screen.getByText('Cancel Creation');
            
            fireEvent.click(cancelButton);

            //assertion
            expect(mockCancel).toHaveBeenCalled();
            expect(mockCancel).toHaveBeenCalledTimes(1);
                
            await wait(() => cancelButton);
            
        })
   });

   describe("As an employee, I want to be able to save the PRF", () => {
        test("Create New PRF", async ()=>{
            const { getByText, getByLabelText } = render( <BrowserRouter> 
            <NewPRF/> 
            </BrowserRouter>
            );
            // tests the functionality of the handleSave function from NewPRF.jsx

            const inputRecipient = screen.getByPlaceholderText("Recipient");
            const inputPax = screen.getByPlaceholderText("Input Name");
            const inputParticulars = screen.getByPlaceholderText("Input Particulars");
            //added some input values to test them as well > u <

            const savePRFButton = screen.getByText("Save");

            fireEvent.change(inputRecipient, {target:{value:"Recipient"}});
            expect(inputRecipient).toHaveValue("Recipient");

            fireEvent.change(inputPax, {target:{value:"Pax"}});
            expect(inputPax).toHaveValue("Pax");

            fireEvent.change(inputParticulars, {target:{value:"Particulars"}});
            expect(inputParticulars).toHaveValue("Particulars");
            
            fireEvent.click(savePRFButton);

            //assertion
            expect(mockNewPRF).toHaveBeenCalled();
            expect(mockNewPRF).toHaveBeenCalledTimes(1);
            await wait(() => savePRFButton);

        });
   });