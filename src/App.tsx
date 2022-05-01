import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Nav from "./views/Nav";
import ClubContainer from "./containers/ClubContainer";
import TodoList from "./containers/TodoList";
import EmptyPage from "./containers/EmptyPage";
import MemberContainer from "./containers/MemberContainer";
import MembershipContainer from "./containers/MembershipContainer";


class App extends Component {
    render(){
        return (
            <div className="App">
                <Nav/>
                <Routes>
                    <Route path="/" element={<ClubContainer/>} />
                    <Route path="/member" element={<MemberContainer />} />
                    <Route path="/membership/:clubId" element={<MembershipContainer />} />
                    <Route path="*" element={<EmptyPage/>} />
                </Routes>
            </div>
        );
    }
}

export default App;
