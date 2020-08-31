import * as React from 'react';
import POTableList from './../POTableList';
import { render, wait} from "@testing-library/react";
import * as renderer from 'react-test-renderer';

    describe("POTableList view renders without crashing", () => {
        test("render check", ()=> {
            const { getByText, getByLabelText } = render(<POTableList/>);
        });
    });

    // describe("Snapshot testing for POTableList view", () => {
    //     test("smileeeee :D", () => {
    //             const tree = renderer
    //               .create(<BrowserRouter> <POTableList/> </BrowserRouter>)
    //               .toJSON();
    //             expect(tree).toMatchSnapshot();
              
    //     });
    // });
    