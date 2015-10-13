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

class DictionaryModal extends Component {

  DOMElement = null;
  formElement = null;

  componentDidMount() {
    var that = this;

    jQuery(this.DOMElement.getDOMNode())
      .modal({
        detachable: false,
        onApprove: function (element) {
          that.save();
        },
        onHidden: function () {
          that.props.onHidden();
        }
      });

      jQuery('.ui.checkbox').checkbox();
      jQuery('.selection.dropdown').dropdown();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');

    if(this.props.show) {
      jQuery(this.DOMElement.getDOMNode()).modal('show');
    }
  }

  save() {
    console.log('save');
  }

  render() {

    var dictionary = this.props.dictionary || {};
    var saveMode = typeof dictionary.id === 'undefined' ? true : false;

    return (
      <section id="shortcutEditModal" className="ui modal" ref={(c) => {this.DOMElement = c}}>
        <i className="close icon"></i>
        <div className="header">
          {saveMode ? tr('New Dictionary') : tr('Update Dictionary')}
        </div>
        <div className="content">

          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" value={dictionary.name} />
            </div>
            <div className="field">
              <label>Description</label>
              <input type="text" name="description" placeholder="Description" value={dictionary.description} />
            </div>
            <div className="two fields">
              <div className="field">
                <label>{tr('Source Language')}</label>
                <LanguageSelect name="sourceLanguage" value={dictionary.sourceLanguage} defaultText={tr('Please select')} />
              </div>

              <div className="field">
                <label>{tr('Target Language')}</label>
                <LanguageSelect name="targetLanguage" value={dictionary.targetLanguage} defaultText={tr('Please select')} />
              </div>
            </div>
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" tabIndex="0" className="hidden" name="active" value={dictionary.active} />
                <label>In use</label>
              </div>
            </div>
          </form>

        </div>
        <div className="actions">
          <div className="ui black deny button">
            {tr('Cancel')}
          </div>
          <div className="ui positive right labeled icon button">
            {saveMode ? tr('Save') : tr('Update')}
            <i className="checkmark icon"></i>
          </div>
        </div>
      </section>
    );
  }
}

export default DictionaryModal;
