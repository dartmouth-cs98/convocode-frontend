import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import ActionTypes from './utils/store';
import reducers from './store/reducers';
import { authTokenName } from './utils/constants';

import App from './components/app';
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// Check if auth token is present in browser
const getTokenFromLocalStorage = () => new Promise((resolve) => {
  resolve(localStorage.getItem(authTokenName));
});

getTokenFromLocalStorage().then((authToken) => {
  if (authToken) { // User has previous authentication token
    store.dispatch({ type: `${ActionTypes.AUTH_USER}_SUCCESS`, payload: {} });
  } else { // No authorization
    store.dispatch({ type: `${ActionTypes.DEAUTH_USER}_SUCCESS` });
  }
}).catch((error) => {
  console.error(error);
});

// we now wrap App in a Provider
ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
