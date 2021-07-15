// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
import App from "./App";
import rootReducers from "./store/reducer/index";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";

//here we create an object to store the current state of the application
const store = createStore(rootReducers);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);