import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { fireEvent, render, wait, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './components/login.component';
import Admin from './layouts/Admin';
import NewPRF from './views/NewPRF';
import NewPO from './views/NewPO';
import PRFTableList from './views/PRFTableList';
import POTableList from './views/POTableList';
import AdminPRFTableList from './views/AdminPRFTableList';
import AdminPOTableList from './views/AdminPOTableList';
import GrossIncomeReport from './views/GrossIncomeReport';
import AdminPRFList from './views/AdminPRFList';

import {BrowserRouter} from "react-router-dom";

// cheats mo to
// fireEvent.click()      to click
//  fireEvent.change(const_here, {target:{value:"value_here"}});
// expect(const_here).toHaveValue("value_here");    to change values



const mockCheckCredentials = (Login.checkCredentials = jest.fn());
const mockIsAdmin = (Login.isAdmin = jest.fn());
const mockPRFSave = (NewPRF.handleSave = jest.fn());
const mockPOSave = (NewPO.handleSave = jest.fn()); 
const mockNewFolder = (AdminPRFList.handleAddNF = jest.fn());
const mockDeletePRF = (AdminPRFTableList.handleDelete = jest.fn());

test("Grand Pacific Travel and Tours Corporations App renders without crashing", ()=>{
    const div = document.createElement('div');
    render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


test("Login page renders without crashing", ()=> {
    const { getByText } = render(<Login/>);
   expect(getByText("Welcome!")).not.toBeNull();
   expect(getByText("User")).not.toBeNull();
   expect(getByText("Password")).not.toBeNull();
   expect(getByText("Login")).not.toBeNull();
});


test("Testing Login Functionality",  ()=> {

    const { getByText, getByPlaceholderText } = render(<App/>); 
    const password = getByText("********");
    const testValues = {
        password: 'password',
        handleSubmit: jest.fn(),
    };

    const loginButton = getByText("Login");

    fireEvent.change(password, {target:{value:"password"}});
    expect(password).toHaveValue("password");

    fireEvent.click(loginButton);
    expect(mockCredentials).toHaveBeenCalledTimes(1);
    expect(testValues.handleSubmit).toBeCalledWith({password: testValues.password});
});

test("Admin view rendering", ()=> {
    const div = document.createElement('div');
    render(<Admin/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test("NewPRF view renders without crashing", ()=> {

   const div = document.createElement('div');
    render(<BrowserRouter> <NewPRF/> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);

 });

test("I want to be able to save the PRF", async ()=>{
    const { getByText, getByLabelText, getByPlaceholderText } = render( <BrowserRouter> 
    <NewPRF/> 
    </BrowserRouter>
    );
        // tests the functionality of the handleSave function from NewPRF.jsx

        //added some input values to test them as well > u <
        const inputRecipient = getByPlaceholderText("Recipient");
        const inputPax = getByPlaceholderText("Input Name");
        const inputParticulars = getByPlaceholderText("Input Particulars");
       // const inputUStoPHP = getByLabelText("US$ to PHP");
       // TestingLibraryElementError: Found a label with the text of: US$ to PHP, however no form control was found associated to that label. 
       // Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
        const savePRFButton = getByText("Save");
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
    const div = document.createElement('div');
    render(
    <PRFTableList/>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

test("I want to be able to save the PO", async ()=>{
         const { getByText, getByPlaceholderText } = render( <BrowserRouter> 
         <NewPO/> 
         </BrowserRouter>
         );
         // tests the functionality of the handleSave function from NewPO.jsx
         const inputRecipient = getByPlaceholderText("Recipient");
        const inputPax = getByPlaceholderText("Input Name");
        const inputParticulars = getByPlaceholderText("Input Particulars");

        //added some input values to test them as well > u <

        const savePOButton = getByText("Save");

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
    const div = document.createElement('div');
    render(<POTableList/>, div);
    ReactDOM.unmountComponentAtNode(div);
    });

    test("Gross Income Report renders without crashing", ()=>{
        const {getByText} = render(<GrossIncomeReport/>);
        
        expect(getByText("Gross Income Report")).not.toBeNull();
        expect(getByText("Select PRF Folder")).not.toBeNull();
        expect(getByText("Date Created")).not.toBeNull();
        expect(getByText("Paid Date")).not.toBeNull();
        expect(getByText("PRF Amount")).not.toBeNull();
        expect(getByText("PO Amount")).not.toBeNull();
        expect(getByText("Gross")).not.toBeNull();
    });

    test("Admin PRFTableList renders without crashing", ()=>{
        const div = document.createElement('div');
        render(<AdminPRFTableList/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test("Admin POTableList renders without crashing", ()=>{
        const div = document.createElement('div');
        render(<AdminPOTableList/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test("New Folder Functionality (handleAddNF)", async ()=>{
        //mocks handleAddNF

        const {getByText} = render(<Admin/>);
        const clickNF = getByText("New Folder");
        
        fireEvent.click(clickNF);
        const input = getByText("Paid Date");

        fireEvent.change(input, {target:{value:"803"}});
        expect(input).toHaveValue("803");
        fireEvent.click(screen.getByText("Confirm"));

        expect(mockNewFolder).toHaveBeenCalledTimes(1);

        await wait(() => mockNewFolder);

    });

    test("Delete PRF Functionality (handleDelete)", async ()=>{
        //mocks handleDelete in AdminPRFTableList

        const {getByText, getByTestId} = render(<AdminPRFTableList/>);

       // const deleteButton = getByTestId("deletebutton");

        fireEvent.click(deleteButton);

        expect(mockDeletePRF).toHaveBeenCalledTimes(1);

        await wait(()=> mockDeletePRF);
    });
