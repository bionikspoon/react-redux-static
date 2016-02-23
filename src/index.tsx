///<reference path="../typings/main.d.ts"/>
///<reference path="references.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './containers/App/index';
import './main.scss';
import { createStore } from './redux/create';
import { browserHistory } from 'react-router'


const store = createStore(browserHistory);
const app = document.getElementById('app');

ReactDOM.render(<App store={store} history={browserHistory} />, app);


