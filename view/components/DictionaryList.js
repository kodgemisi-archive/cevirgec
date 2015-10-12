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
  render() {
    var dictionaryMap = this.props.dictionaries.toObject();
    return (
      <div className="ui middle aligned divided list">
        {Object.getOwnPropertyNames(dictionaryMap).map(function (key) {
          var dictionary = dictionaryMap[key];
          return (
            <div className="item">
              <div className="right floated content">
                <button className="ui icon button" data-content={tr('Add a new word to this dictionary')}> <i className="add icon"></i> </button>
                <button className="ui icon button" data-content={tr('Print')}> <i className="print icon"></i> </button>
                <button className="ui icon button" data-content={tr('View dictionary content')}> <i className="unhide icon"></i> </button>
                <button className="ui icon button" data-content={tr('Edit')}> <i className="edit icon"></i> </button>
              </div>

              <div className="left floated content">
                <div className="ui toggle checkbox" data-content={tr('Use this dictionary')}>
                  <input type="checkbox" tabindex="0" class="hidden" checked={dictionary.active} />
                  <label></label>
                </div>
              </div>

              <div className="content">
                <div className="header">{dictionary.name}</div>
                <div className="description">{dictionary.sourceLanguage} => {dictionary.targetLanguage}</div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Dictionaries;
