import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import {BrowserRouter} from "react-router-dom";
import ClubStore from "./stores/ClubStore";
import MemberStore from "./stores/MemberStore";
import MembershipStore from "./stores/MembershipStore";
import BoardStore from "./stores/BoardStore";
import PostingStore from "./stores/PostingStore";
import CommentStore from "./stores/CommentStore";

ReactDOM.render(

    <Provider clubStore={ClubStore} memberStore={MemberStore} membershipStore={MembershipStore}
              boardStore={BoardStore} postingStore={PostingStore} commentStore={CommentStore}>
        <BrowserRouter>
            {/*<React.StrictMode>*/}
                <App />
            {/*</React.StrictMode>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
