/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import tr from '../utils/Translation';

class ShortcutEditModal extends Component {

  thisDOMElement = null;

  componentDidUpdate() {
    console.log('componentDidUpdate');

    if(this.props.show) {
      jQuery(this.thisDOMElement.getDOMNode())
        .modal({
          blurring: true,
          onApprove: function (element) {
            console.log('approve');
          }
        })
        .modal('show');
    }
  }

  changeShortcut() {
    // TODO dispatch event
    console.log('changeShortcut');
  }

  render() {

    // if(this.props.show !== true) {
    //   console.log('NULL');
    //   return null;
    // }

    return (
      <section id="shortcutEditModal" className="ui basic modal" ref={(c) => this.thisDOMElement = c}>
        <i className="close icon"></i>
        <div className="header">
          {tr('Set new shortcut for')} {this.props.name}
        </div>
        <div className="image content">
          <div className="image">
            <i className="keyboard icon"></i>
          </div>
          <div className="description">
            <p>{tr('Current shortcut for ')} {this.props.name} is {this.props.keyBinding}</p>
          </div>
        </div>
        <div className="actions">
          <div className="two fluid ui inverted buttons">
            <button className="ui red basic inverted button cancel">
              <i className="remove icon"></i>
              {tr('Cancel')}
            </button>
            <button className="ui green basic inverted button approve">
              <i className="checkmark icon"></i>
              {tr('Set new shortcut')}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default ShortcutEditModal;
