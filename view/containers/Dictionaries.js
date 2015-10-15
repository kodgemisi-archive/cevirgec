/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import {Container} from 'flux/utils';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import DataSourceDispatcher, {dispatch} from '../dispatcher/DataSourceDispatcher';
import Constants from '../utils/constants';
import DictionaryStore from '../stores/DictionaryStore';
import DictionaryList from '../components/DictionaryList';
import DictionaryModal from '../components/DictionaryModal';
import DefinitionModal from '../components/DefinitionModal';

import tr from '../utils/Translation';

class Dictionaries extends Component {

  _triggerJqueryPlugins() {
    jQuery('[data-content]').popup();
  }

  static getStores(): Array<Store> {
    return [DictionaryStore];
  }

  static calculateState(prevState: ?State): State {
    return {
      dictionaries : DictionaryStore.getDictionaries(),
      isLoading: DictionaryStore.isLoading()
    }
  }

  componentWillMount() {
    DataSourceDispatcher.dispatch({
      type: Constants.LOAD_DICTIONARIES
    });
  }

  componentDidMount() {
    this._triggerJqueryPlugins();
  }

  componentDidUpdate() {
    this._triggerJqueryPlugins();
  }

  showDictionaryModal(dictionary) {
    this.setState({
      selectedDictionary: dictionary,
      isDictionaryModalVisible: true
    });
  }

  onDictionaryModalHidden() {
    this.setState({
      selectedDictionary: null,
      isDictionaryModalVisible: false
    });
  }

  showDefinitionModal(dictionaryId){
    this.setState({
      dictionaryId: dictionaryId,
      isDefinitionModalVisible: true
    });
  }

  onDefinitionModalHidden() {
    this.setState({
      dictionaryId: null,
      isDefinitionModalVisible: false
    });
  }

  render() {

    var loading = (() => {
      if(this.state.isLoading) {
        return (
          <div className="ui active inverted dimmer">
            <p className="ui text loader">{tr('Loading')}</p>
          </div>
        );
      }
    })();

    var listContent = (() => {
      if(this.state.dictionaries.size == 0) {
        return (

          <div className="item">
            <div className="header" style={{'textAlign':'center'}}>
              <p>{tr('You have no dictionaries yet.')}</p>
              <p>{tr('You can create right now.')}</p>
              {loading}
            </div>
          </div>

        );
      }
      else {
        return (
          <DictionaryList dictionaries={this.state.dictionaries} showDictionaryModalFn={this.showDictionaryModal.bind(this)} showDefinitionModalFn={this.showDefinitionModal.bind(this)} />
        );
      }
    })();

    return (
      <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
        <div className="ui segments">
          <div className="ui clearing segment">
            <h3 className="ui left floated header">{tr('Dictionaries')}</h3>
            <button onClick={this.showDictionaryModal.bind(this)} className="ui icon primary button right floated" data-content={tr('Add new')}> <i className="add circle icon"></i> </button>
          </div>

          <div className="ui grey segment">
            {listContent}
          </div>

          <DictionaryModal show={this.state.isDictionaryModalVisible}  dictionary={this.state.selectedDictionary} onHidden={this.onDictionaryModalHidden.bind(this)} />
          <DefinitionModal show={this.state.isDefinitionModalVisible} dictionaryId={this.state.dictionaryId} onHidden={this.onDefinitionModalHidden.bind(this)} />
        </div>
      </DocumentTitle>
    );
  }
}

export default Container.create(Dictionaries);
