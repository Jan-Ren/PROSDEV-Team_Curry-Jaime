import * as React from 'react';
import NewPRF from './../NewPRF';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);

    describe("NewPRF view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<NewPRF/>);
        });
    });

   