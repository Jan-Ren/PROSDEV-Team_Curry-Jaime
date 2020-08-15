import * as React from 'react';
import PRF from './../PRF';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);
    
    describe("PRF layout renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<PRF/>);
        });
    });