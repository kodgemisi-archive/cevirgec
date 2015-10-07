import React from 'react';
import Dashboard from './containers/Dashboard';
import Settings from './containers/Settings';
import Main from './containers/Main';
import Options from './components/Options';
import Shortcuts from './components/Shortcuts';

import { Router, Route, IndexRoute, Redirect, Link } from 'react-router';
import './app.scss';

// Route config
var content = document.getElementById('react-root');

// FIXME
// Instead of Redirect we will use IndexRedirect once it is introduced
// with the new version

var Routes = (
  <Router>
    <Route path="/" component={Main}>
    	<Redirect from="settings" to="/settings/options" />
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="settings" component={Settings}>
        <Route path="options" component={Options} />
        <Route path="shortcuts" component={Shortcuts} />
      </Route>
    </Route>
  </Router>
);

React.render(Routes, content);

Link.defaultProps.activeClassName = 'active';