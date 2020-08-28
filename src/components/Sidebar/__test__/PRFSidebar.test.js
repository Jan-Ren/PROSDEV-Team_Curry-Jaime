import React from 'react';
import ReactDOM from 'react-dom';
import PRFSidebar from './../PRFSidebar';
import { render } from "@testing-library/react";

    describe("PRFSidebar component render check", () => {
        it("PRFSidebar component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<PRFSidebar> </PRFSidebar>, div) //use ReactDOM function to render
        });
    });
