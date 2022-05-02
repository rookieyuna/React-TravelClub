import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Nav from "./views/Nav";
import ClubContainer from "./containers/ClubContainer";
import TodoList from "./containers/TodoList";
import EmptyPage from "./containers/EmptyPage";
import MemberContainer from "./containers/MemberContainer";
import MembershipContainer from "./containers/MembershipContainer";
import MembershipOfMemberContainer from "./containers/MembershipOfMemberContainer";


class App extends Component {
    render(){
        return (
            <div className="App">
                <Nav/>
                <Routes>
                    <Route path="/" element={<ClubContainer/>} />
                    <Route path="/member" element={<MemberContainer />} />
                    <Route path="/membership/:id" element={<MembershipContainer />} />
                    <Route path="/membershipOf/:email" element={<MembershipOfMemberContainer />} />
                    <Route path="*" element={<EmptyPage/>} />
                </Routes>
            </div>
        );
    }
}

export default App;
