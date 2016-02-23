import * as React from 'react';
import { Route, IndexRoute } from 'react-router';


import { indexPage } from './pages/index';
import { projectsPage } from './pages/projects';
import { aboutPage } from './pages/about';


export function routes() {
  return ( // :off
    <Route path="/">
      <IndexRoute component={indexPage}/>
      <Route path="about" component={aboutPage} />
      <Route path="projects" component={projectsPage} />
    </Route>
  ); // :on
}

