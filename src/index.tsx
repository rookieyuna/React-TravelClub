import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import {BrowserRouter} from "react-router-dom";
import MemberStore from "./stores/MemberStore";
import ClubStore from "./stores/ClubStore";
import MembershipStore from "./stores/MembershipStore";
import BoardStore from "./stores/BoardStore";

ReactDOM.render(

    <Provider clubStore={ClubStore} memberStore={MemberStore} membershipStore={MembershipStore} boardStore={BoardStore}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
