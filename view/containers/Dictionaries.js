/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import {Container} from 'flux/utils';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import {dispatch} from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';
import DictionaryStore from '../stores/DictionaryStore';

import tr from '../utils/Translation';

class Dictionaries extends Component {

  static getStores(): Array<Store> {
    return [DictionaryStore];
  }

  static calculateState(prevState: ?State): State {
    return {
      dictionaries : DictionaryStore.getState()
    }
  }

  _createDictionary() {
    dispatch({
      type: Constants.DICTIONARY_CREATE,
      name: 'zaa test'
    });
  }

  componentDidMount() {
    $('[data-content]').popup();
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
        <div className="ui segments">
          <div className="ui clearing segment">
            <h3 className="ui left floated header">{tr('Dictionaries')}</h3>
            <button onClick={this._createDictionary} className="ui icon primary button right floated" data-content={tr('Add new')}> <i className="add circle icon"></i> </button>
          </div>

          <div className="ui grey segment">
            <div className="ui middle aligned divided list">
              {Object.getOwnPropertyNames(this.state.dictionaries.toObject()).map(function (dictionary) {
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
                        <input type="checkbox" tabindex="0" class="hidden" />
                        <label>{dictionary}</label>
                      </div>
                    </div>

                    <div className="content">
                      <div className="header">Add new word</div>
                      <div className="description">{tr('Binding result:')} <h5 className="ui green header">Successful</h5></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Container.create(Dictionaries);
