import * as React from 'react';
import Login from './../login.component';
import { render } from "@testing-library/react";

    test("login page renders without crashing", ()=> {
        const { getByText, getByLabelText } = render(<Login/>);

        expect(getByText("Welcome!")).not.toBeNull(); //assert
        expect(getByText("User")).not.toBeNull();
        expect(getByText("Password")).not.toBeNull();
        expect(getByText("Login")).not.toBeNull();
    });

    // test("As an employee, I want to be able to login", ()=> {
    //     const { getByText, getByLabelText } = render(<Login/>);

    // userEvent.selectOptions(screen.getByPlaceholderText('Admin'), ['1']);
    
    // userEvent.click(screen.getByPlaceholderText("********"));
    // userEvent.type(screen.getByPlaceholderText("********"), 'password');

    // userEvent.click(screen.getByText('Login'));

    // });
