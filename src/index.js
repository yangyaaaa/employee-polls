import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducer, middleware);
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
