import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import MemberStore from "./stores/MemberStore";
import ClubStore from "./stores/ClubStore";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(

    <Provider clubStore={ClubStore} memberStore={MemberStore}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
