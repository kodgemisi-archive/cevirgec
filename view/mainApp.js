import React from 'react';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';

import { Router, Route } from 'react-router';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {};

// Route config
var content = document.getElementById('react-root');

var Routes = (
  <Router>
    <Route component={AppComponent}>
      <Route path="/" component={Home} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Router>
);

React.render(Routes, content);
