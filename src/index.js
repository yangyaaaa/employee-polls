import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from './utils/store';
import './index.css';
import App from './components/App';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);