import * as React from 'react';
import NewPO from './../NewPO';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);
    
    describe("NewPO view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<NewPO/>);
        });
    });
    