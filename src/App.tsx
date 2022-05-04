import React, {Component} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Nav from "./views/Nav";
import EmptyPage from "./views/EmptyPage";
import ClubContainer from "./containers/ClubContainer";
import MemberContainer from "./containers/MemberContainer";
import MembershipContainer from "./containers/MembershipContainer";
import MembershipOfMemberContainer from "./containers/MembershipOfMemberContainer";
import BoardContainer from "./containers/BoardContainer";
import PostingContainer from "./containers/PostingContainer";

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
                    <Route path="/board" element={<BoardContainer />} />
                    <Route path="/board/:id" element={<PostingContainer />} />
                    <Route path="/board/:id/:pId" element={<PostingContainer />} />
                    <Route path="*" element={<EmptyPage/>} />
                </Routes>
            </div>
        );
    }
}

export default App;
