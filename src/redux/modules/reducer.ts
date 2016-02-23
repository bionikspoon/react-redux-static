import { root } from './root';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
export const reducer = combineReducers(Object.assign({}, root, { routing: routeReducer }));
