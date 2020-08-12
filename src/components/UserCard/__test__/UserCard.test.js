import React from 'react';
import ReactDOM from 'react-dom';
import UserCard from './../UserCard';
import { render } from "@testing-library/react";

    describe("UserCard component render check", () => {
        it("UserCard component renders without crashing", ()=>{
            const div = document.createElement("div"); //attach component to the div
            ReactDOM.render(<UserCard> </UserCard>, div) //use ReactDOM function to render
        });
    });
