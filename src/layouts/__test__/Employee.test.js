import * as React from 'react';
import Employee from './../Employee';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);

    describe("Employee layout renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<Employee/>);
        });
    });