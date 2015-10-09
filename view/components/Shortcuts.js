/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import tr from '../utils/Translation';

import ShortcutEditModal from './ShortcutEditModal';

import '../styles/shortcuts.scss';

class Shortcuts extends Component {

  state = {};

  openModal(shortcutKey) {
    this.setState({
      selectedShortcutKey: shortcutKey,
      selectedShortcutName: 'whatever',
      showShortcutEditModal: true
    });
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Settings › Options')}>
        <div className="ui segments">
          <div className="ui segment">
            <h3>{tr('Global Shortcuts')}</h3>
          </div>

          <div id="shortcuts" className="ui grey segment">
            <div className="ui middle aligned divided list">
              <div className="item">
                <div className="right floated content">
                  <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  <button className="ui icon button"> <i className="edit icon"></i> </button>
                </div>
                <i className="plus icon"></i>
                <div className="content">
                  <div className="header">Add new word</div>
                  <div className="description">{tr('Binding result:')} <h5 className="ui green header">Successful</h5></div>
                </div>
              </div>
              <div className="item">
                <div className="right floated content">
                  <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  <button className="ui icon button"> <i className="edit icon"></i> </button>
                </div>
                <i className="search icon"></i>
                <div className="content">
                  <div className="header">Check for a word</div>
                  <div className="description">{tr('Binding result:')} <h5 className="ui green header">Successful</h5></div>
                </div>
              </div>
              <div className="item">
                <div className="right floated content">
                  <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  <button className="ui icon button"> <i className="edit icon"></i> </button>
                </div>
                <i className="dashboard icon"></i>
                <div className="content">
                  <div className="header">Open dashboard</div>
                  <div className="description">{tr('Binding result:')} <h5 className="ui green header">Successful</h5></div>
                </div>
              </div>
              <div className="item">
                <div className="right floated content">
                  <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  <button className="ui icon button" onClick={this.openModal.bind(this, 'TOGGLE_VERBOSE')}> <i className="edit icon"></i> </button>
                </div>
                <i className="announcement icon"></i>
                <div className="content">
                  <div className="header">Toggle verbosity</div>
                  <div className="description">{tr('Binding result:')} <h5 className="ui green header">Successful</h5></div>
                </div>
              </div>
            </div>
          </div>
          <ShortcutEditModal ref={(c) => this._modal = c} keyBinding={this.state.selectedShortcutKey} name={this.state.selectedShortcutName} show={this.state.showShortcutEditModal} />
        </div>
      </DocumentTitle>
    );
  }
}

export default Shortcuts;
