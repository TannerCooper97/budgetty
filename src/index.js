// Import the provider Component from React-Redux and the store
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './ducks/store'

//Wrapping the APP component in the PROVIDER component gives the entire application acces to whatever is in the store, because we pass in the store as a prop to the provider, and wrap our provider around our app. 
ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

