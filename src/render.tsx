import * as React from 'react';

import { RouterContext, match, createMemoryHistory, useRouterHistory } from "react-router";
import { routes } from './routes';
import { Html } from './components/index';
import { renderToString } from 'react-dom/server';

export default  (locals, callback) => {
  const history = useRouterHistory(createMemoryHistory)();
  const location = history.createLocation(locals.path);

  match({ routes: routes(), location }, (error, redirectLocation, renderProps) => {
    const html = renderToString(<Html locals={locals}><RouterContext {...renderProps} /></Html>);
    callback(error, `<!DOCTYPE html>${html}`)
  });
}
