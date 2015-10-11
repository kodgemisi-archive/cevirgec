/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import type {Action} from './TodoActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dictionary from '../entity/Dictionary';
import AppDispatcher, {dispatch} from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';
var ipc = require('ipc');

// Set up the store, If we didn't care about order we could just use MapStore
type State = Immutable.OrderedMap<string, Dictionary>;

var dictionariesCache = Immutable.OrderedMap();

class DictionaryStore extends ReduceStore<string, Dictionary> {

  getInitialState(): State {
    return Immutable.OrderedMap();
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {
      case Constants.DICTIONARY_DESTROY:
        return state.setIn([action.id, 'complete'], true);

      case Constants.DICTIONARY_CREATE:
        return createDictionary(state, action.name);

      case Constants.DICTIONARIES_CHANGED:
        state = dictionariesCache;
        window.x = state;
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
const dictionaryStore = new DictionaryStore(AppDispatcher);

ipc.on('dictionary-created', function(newDictionary) {
  dictionariesCache = dictionariesCache.set(newDictionary.id, newDictionary);
  dispatch({
    type: Constants.DICTIONARIES_CHANGED
  });
});

// Pure helper function to create a new Todo and add it to the state.
function createDictionary(state: State, text: ?string): State {
  ipc.send('dictionary-create', {name: 'test'});
  return state;
}

export default dictionaryStore;
