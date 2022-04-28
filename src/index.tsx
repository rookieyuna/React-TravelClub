import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import ClubStore from "./stores/ClubStore";


const clubStore = new ClubStore();

ReactDOM.render(

    <Provider clubStore={clubStore}>

        <React.StrictMode>
            <App />
        </React.StrictMode>

    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
