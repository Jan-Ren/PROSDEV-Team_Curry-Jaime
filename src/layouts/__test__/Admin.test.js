import * as React from 'react';
import Admin from './../Admin';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);

    describe("Admin layout renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<Admin/>);
        });
    });

