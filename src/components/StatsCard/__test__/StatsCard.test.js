import React from 'react';
import ReactDOM from 'react-dom';
import StatsCard from './../StatsCard';
import { render } from "@testing-library/react";

    describe("StatsCard component render check", () => {
        it("StatsCard component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<StatsCard> </StatsCard>, div) //use ReactDOM function to render
        });
    });
