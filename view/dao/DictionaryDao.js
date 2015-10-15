/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import type {Action} from './TodoActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dictionary from '../entity/Dictionary';
import DataSourceDispatcher from '../dispatcher/DataSourceDispatcher';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';
var ipc = require('ipc');

class DictionaryDao extends ReduceStore<string, Dictionary> {

  getInitialState(): State {
    return Immutable.OrderedMap();
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {
      case Constants.DESTROY_DICTIONARY:
        return state;

      case Constants.CREATE_DICTIONARY:
        ipc.send(Constants.CREATE_DICTIONARY_IPC, action.data);
        return state;

      case Constants.LOAD_DICTIONARIES:
        ipc.send(Constants.LOAD_DICTIONARIES_IPC, true);
        return state;

      case Constants.CREATE_DEFINITION:
        ipc.send(Constants.CREATE_DEFINITION_IPC, action.data);
        return state;

      default:
        return state;
    }
  }

  areAllComplete(): boolean {
    return this.getState().every(todo => todo.complete);
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const dictionaryDao = new DictionaryDao(DataSourceDispatcher);

ipc.on(Constants.DICTIONARY_CREATED, function(newDictionary) {
  AppDispatcher.dispatch({
    type: Constants.DICTIONARY_ADDED,
    data: newDictionary
  });
});

ipc.on(Constants.DICTIONARIES_LOADED_IPC, function(dictionaryArray) {
  var temp =  dictionaryArray.reduce(function (prev, current, index, array) {
    prev.push([current.id, current]);
    return prev;
  }, []);

  AppDispatcher.dispatch({
    type: Constants.DICTIONARIES_LOADED,
    data: new Immutable.OrderedMap(temp)
  });
});


export default dictionaryDao;
