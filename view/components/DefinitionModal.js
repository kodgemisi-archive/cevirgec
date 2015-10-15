/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import LanguageSelect from './LanguageSelect';
import tr from '../utils/Translation';
import {dispatch} from '../dispatcher/DataSourceDispatcher';
import Constants from '../utils/constants';

class DefinitionModal extends Component {

  DOMElement = null;
  formElement = null;

  _triggerJqueryPlugins() {
    jQuery('.ui.checkbox').checkbox();
    jQuery('.selection.dropdown').dropdown();
  }

  componentDidMount() {
    var that = this;

    jQuery(this.DOMElement)
      .modal({
        detachable: false,
        onApprove: function (element) {
          that.save();
        },
        onHide: function () {
          that.props.onHidden();
        }
      });

      this._triggerJqueryPlugins();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');

    if(this.props.show) {
      jQuery(this.DOMElement).modal('show');
    }

    this._triggerJqueryPlugins();
  }

  save() {
    console.log('save');
    var data = $(this.formElement).serializeObject();

    if(this.saveMode) {
      dispatch({
        type: Constants.CREATE_DEFINITION,
        data: data
      });
    }
    else {
      dispatch({
        type: Constants.UPDATE_DEFINITION,
        data: data
      });
    }
  }

  render() {

    var definition = this.props.definition || {};
    this.saveMode = typeof definition.id === 'undefined' ? true : false;

    return (
      <section id="definitionModal" className="ui modal" ref={(c) => {c ? this.DOMElement = c.getDOMNode() : ''}}>
        <i className="close icon"></i>
        <div className="header">
          {this.saveMode ? tr('New Dictionary') : tr('Update Dictionary')}
        </div>
        <div className="content">

          <form className="ui form" ref={(c) => {c ? this.formElement = c.getDOMNode() : ''}}>
            <input type="hidden" name="dictionaryId" value={this.props.dictionaryId} />
            <div className="field">
              <label>Name</label>
              <input type="text" name="key" placeholder="Word/Phrase" value={definition.key} />
            </div>
            <div className="field">
              <label>Description</label>
              <input type="text" name="value" placeholder="Definition" value={definition.value} />
            </div>
          </form>

        </div>
        <div className="actions">
          <div className="ui black deny button">
            {tr('Cancel')}
          </div>
          <div className="ui positive right labeled icon button">
            {this.saveMode ? tr('Save') : tr('Update')}
            <i className="checkmark icon"></i>
          </div>
        </div>
      </section>
    );
  }
}

export default DefinitionModal;
