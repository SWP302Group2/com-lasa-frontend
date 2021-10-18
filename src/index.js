import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App.js";
import storeConfig from "./redux/store.js";
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'

const app = (
  <Provider store={storeConfig().store}>
    <PersistGate loading={null} persistor={storeConfig().persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();


