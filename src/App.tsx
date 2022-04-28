import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import TodoList2 from "./containers/TodoList";
import Nav from "./views/Nav";
import ClubContainer from "./containers/ClubContainer";


class App extends Component {
    render(){
        return (

            <div className="App">
                <Nav/>
                {/*<TodoList2 />*/}
                <ClubContainer/>
            </div>
        );
    }
}

export default App;
