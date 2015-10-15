import React from 'react';
import Dashboard from './containers/Dashboard';
import Settings from './containers/Settings';
import Main from './containers/Main';
import Options from './components/Options';
import Shortcuts from './components/Shortcuts';

import Dictionaries from './containers/Dictionaries';
import DictionaryList from './components/DictionaryList';

// need to initialize dao
import DictionaryDao from './dao/DictionaryDao';

import { Router, Route, IndexRoute, Redirect, Link } from 'react-router';

import 'form-serializer'; // jQuery form serializer plugin, usage: $('form').serializeObject()

import './app.scss';

// See https://github.com/atom/electron/issues/254
window.jQuery = window.$ = require('jquery');

// importing this doesn't works because it's executed before
// 'require's and since this is dependant to jQuery application
// breaks. Hence we had to require semantic-ui as well.
require ('../node_modules/semantic-ui/dist/semantic.js');

// Route config
var content = document.getElementById('react-root');

// FIXME
// Instead of Redirect we will use IndexRedirect once it is introduced
// with the new version

var Routes = (
  <Router>
    <Route path="/" component={Main}>
    	<Redirect from="settings" to="/settings/options" />
      <Redirect from="dictionaries" to="/dictionaries/list" />
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="settings" component={Settings}>
        <Route path="options" component={Options} />
        <Route path="shortcuts" component={Shortcuts} />
      </Route>
      <Route path="dictionaries" component={Dictionaries}>
        <Route path="list" component={DictionaryList} />
      </Route>
    </Route>
  </Router>
);

React.render(Routes, content);

Link.defaultProps.activeClassName = 'active';
