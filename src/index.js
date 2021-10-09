import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App.js";
import store from "./redux/store.js";
import reportWebVitals from './reportWebVitals';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();


