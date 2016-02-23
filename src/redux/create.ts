import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';


export function createStore(history = browserHistory, initialState = {}) {
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [ reduxRouterMiddleware ];
  let enhancer;
  if (__DEV__) {
    const { persistState } = require('redux-devtools');
    enhancer = compose( // :off
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() :  e => e,
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ); // :on
  }
  else {
    enhancer = applyMiddleware(...middleware);
  }


  const { reducer } = require('./modules/reducer');

  const store = createStore(reducer, initialState, enhancer);

  reduxRouterMiddleware.listenForReplays(store);

  if (__DEV__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').reducer);
    })
  }

  return store;
}
