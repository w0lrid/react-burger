import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root-reducer';
import { socketMiddleware } from './utils/socketMiddleware';
import { wsActions } from './services/actions/feed-socket';
import { userWsActions } from './services/actions/user-feed-socket';
import { configureStore } from '@reduxjs/toolkit';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const userOrdersUrl = `wss://norma.nomoreparties.space/orders`;
const middleware = [thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(userOrdersUrl, userWsActions)];
export const store = configureStore({ reducer: rootReducer, middleware: middleware });
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
