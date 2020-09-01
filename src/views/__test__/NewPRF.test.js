import * as React from 'react';
import NewPRF from './../NewPRF';
import { fireEvent, render, screen, wait } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import * as renderer from 'react-test-renderer';

//const mockCancel = (NewPRF.props.history.goBack() = jest.fn());
const mockSave = (NewPRF.handleSave = jest.fn()); 

    describe("NewPRF view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<BrowserRouter> <NewPRF/> </BrowserRouter>);
        });
    });

    // describe("Snapshot testing for NewPRF view", () => {
    //     test("smileeeee :D", () => {
    //             const tree = renderer
    //               .create(<BrowserRouter> <NewPRF/> </BrowserRouter>)
    //               .toJSON();
    //             expect(tree).toMatchSnapshot();
              
    //     });
    // });

//     describe("As an employee, I want to be able to cancel the creation",  () => {
//         test("Cancel New PRF", async ()=>{

//             // tests the functionality of the handleRemove function from NewPRF.jsx

//             const { getByText, getByLabelText } = render( <BrowserRouter> 
//             < NewPRF/> 
//             </BrowserRouter>
//             );
//             const cancelButton = screen.getByText('Cancel Creation');
            
//             fireEvent.click(cancelButton);

//             //assertion
//             expect(mockCancel).toHaveBeenCalledTimes(1);
                
//             await wait(() => cancelButton);
            
//         })
//    });

   describe("As an employee, I want to be able to save the PRF", () => {
        test("Create New PRF", async ()=>{
            const { getByText, getByLabelText } = render( <BrowserRouter> 
            <NewPRF/> 
            </BrowserRouter>
            );
            // tests the functionality of the handleSave function from NewPRF.jsx
            

            //added some input values to test them as well > u <
            const inputRecipient = screen.getByPlaceholderText("Recipient");
            const inputPax = screen.getByPlaceholderText("Input Name");
            const inputParticulars = screen.getByPlaceholderText("Input Particulars");

           // const inputUStoPHP = screen.getByLabelText("US$ to PHP");
           // TestingLibraryElementError: Found a label with the text of: US$ to PHP, however no form control was found associated to that label. 
           // Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.

            const savePRFButton = screen.getByText("Save");

            fireEvent.change(inputRecipient, {target:{value:"Recipient"}});
            expect(inputRecipient).toHaveValue("Recipient");

            fireEvent.change(inputPax, {target:{value:"Pax"}});
            expect(inputPax).toHaveValue("Pax");

            fireEvent.change(inputParticulars, {target:{value:"Particulars"}});
            expect(inputParticulars).toHaveValue("Particulars");
            
            // fireEvent.change(inputUStoPHP, {target:{value:"200"}});
            // expect(inputParticulars).toHaveValue("200");

            fireEvent.click(savePRFButton);

            //assertion
            expect(mockSave).toHaveBeenCalledTimes(1);
            await wait(() => mockSave);

        });
   });