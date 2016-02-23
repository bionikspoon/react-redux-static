import * as React from 'react';
import { Router, browserHistory } from 'react-router';
import { routes } from '../../routes';
import { Provider } from 'react-redux';
import { createStore } from '../../redux/create';
import { browserHistory } from 'react-router'
import { Header } from '../../components/Header/index';
import './App.scss';

export function App({ store=createStore(), history = browserHistory }) {
  return ( // :off
    <Provider store={store}>
      <div>
        <Header />
        <Router history={history || browserHistory}>{routes()}</Router>

      </div>
    </Provider>
  ); // :on
}
