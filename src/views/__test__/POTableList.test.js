import * as React from 'react';
import POTableList from './../POTableList';
import { render, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

    afterEach(cleanup);

    describe("POTableList view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<POTableList/>);
        });
    });

    