import React from 'react';
import App from './App';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './components/Login/login.component';
import NewPRF from './views/NewPRF';
import NewPO from './views/NewPO';
import PRFTableList from './views/PRFTableList';
import POTableList from './views/POTableList';

import {BrowserRouter} from "react-router-dom";

// cheats mo to
// fireEvent.click()      to click
//  fireEvent.change(const_here, {target:{value:"value_here"}});
// expect(const_here).toHaveValue("value_here");    to change values


// r u mocking me
const mockCheckCredentials = (Login.checkCredentials = jest.fn());
const mockIsAdmin = (Login.isAdmin = jest.fn());
const mockPRFSave = (NewPRF.handleSave = jest.fn());
const mockPOSave = (NewPO.handleSave = jest.fn()); 

test("Grand Pacific Travel and Tours Corporations App renders without crashing", ()=>{
    const { getByText, getByLabelText } = render(<App/>);
});


test("Login page renders without crashing", ()=> {
    const { getByText, getByLabelText } = render(<Login/>);
});
test("Testing Login Functionality", async ()=> {
    const { getByText, getByLabelText } = render(<Login/>);
    const user = screen.getByPlaceholderText("Select an option");
    const password = screen.getByPlaceholderText("********");
    const loginButton = screen.getByText("Login");

    
    fireEvent.change(user, {target:{value:"Admin"}});
    fireEvent.change(password, {target:{value:"password"}});

    fireEvent.click(loginButton);
    expect(mockCheckCredentials).toHaveBeenCalled();
    expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            await wait(() => mockCheckCredentials);
});



test("NewPRF view renders without crashing", ()=> {
   const { getByText, getByLabelText } = render(<BrowserRouter> <NewPRF/> </BrowserRouter>);
 });

test("As an employee, I want to be able to save the PRF", async ()=>{
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
        expect(mockPRFSave).toHaveBeenCalledTimes(1);
        await wait(() => mockPRFSave);
    });


test("PRFTableList view renders without crashing", ()=> {
    const { getByText, getByLabelText } = render(<BrowserRouter>
     <PRFTableList/>
     </BrowserRouter>);
  });


  
        test("As an employee, I want to be able to save the PO", async ()=>{
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
            expect(mockPOSave).toHaveBeenCalledTimes(1);
            await wait(() => mockPOSave);

        });
  

    test("POTableList view renders without crashing", ()=> {
        const { getByText, getByLabelText } = render(<POTableList/>);
    });


