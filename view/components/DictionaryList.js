/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import tr from '../utils/Translation';

class Dictionaries extends Component {

  componentDidMount() {
    jQuery('.ui.checkbox').checkbox();
  }

  edit(dictionaryId, event) {
    var dictionaryMap = this.props.dictionaries.toObject();
    this.props.showDictionaryModalFn(dictionaryMap[dictionaryId]);
  }

  addDefinitionToDictionary(dictionaryId) {
    this.props.showDefinitionModalFn(dictionaryId);
  }

  render() {
    var dictionaryMap = this.props.dictionaries.toObject();
    var that = this;
    return (
      <div className="ui middle aligned divided list">
        {Object.getOwnPropertyNames(dictionaryMap).map(function (key) {
          var dictionary = dictionaryMap[key];
          return (
            <div className="item">
              <div className="right floated content">
                <button className="ui icon button" data-content={tr('Add a new word to this dictionary')} onClick={that.addDefinitionToDictionary.bind(that, dictionary.id)}> <i className="add icon"></i> </button>
                <button className="ui icon button" data-content={tr('Print')}> <i className="print icon"></i> </button>
                <button className="ui icon button" data-content={tr('View dictionary content')}> <i className="unhide icon"></i> </button>
                <button className="ui icon button" data-content={tr('Edit')} onClick={that.edit.bind(that, dictionary.id)}> <i className="edit icon"></i> </button>
              </div>

              <div className="left floated content">
                <div className="ui toggle checkbox" data-content={tr('Use this dictionary')}>
                  <input type="checkbox" tabIndex="0" className="hidden" checked={dictionary.active} />
                  <label></label>
                </div>
              </div>

              <div className="content">
                <div className="header">{dictionary.name}</div>
                <div className="description">{dictionary.sourceLanguage} => {dictionary.targetLanguage} | {dictionary.numberOfDefinitions} definitions</div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Dictionaries;
