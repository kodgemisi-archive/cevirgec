/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import DictionaryStore from '../stores/DictionaryStore';
import Constants from '../utils/constants';
import {dispatch} from '../dispatcher/AppDispatcher';
import {Container} from 'flux/utils';

import { Link } from 'react-router';

import tr from '../utils/Translation';

import '../styles/dashboard.scss';

class Dashboard extends Component {

  static getStores(): Array<Store> {
    return [DictionaryStore];
  }

  static calculateState(prevState: ?State): State {
    return {};
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Dashboard')}>
        <dashboard className="ui four column grid">

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="book icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Dictionaries')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="student icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Study')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="file text outline icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Quiz')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="browser icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Online Dictionaries')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="shop icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Market')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="settings icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Settings')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="help icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('Help')}</a>
              </div>
            </div>
          </div>

          <div className="column center aligned">
            <div className="ui fluid card">
              <Link to="/settings" className="content">
                <i className="info icon"></i>
              </Link>
              <div className="content">
                <a className="header">{tr('About')}</a>
              </div>
            </div>
          </div>

        </dashboard>
      </DocumentTitle>
    );
  }
}

const DashboardContainer = Container.create(Dashboard);
export default DashboardContainer;
