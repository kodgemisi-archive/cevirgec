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

class DictionaryStore extends ReduceStore<string, Dictionary> {

  getInitialState(): State {
    var state = {
      isLoading: true,
      dictionaries: Immutable.OrderedMap()
    }

    return new Immutable.Map(state);
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {

      case Constants.DICTIONARIES_LOADED:
        return state.set('isLoading', false).set('dictionaries', action.data);

      case Constants.DICTIONARY_ADDED:
        return state.setIn(['dictionaries', action.data.id], action.data);

      default:
        return state;
    }
  }

  isLoading(): boolean {
    return this.getState().get('isLoading');
  }

  getDictionaries() {
    return this.getState().get('dictionaries');
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const dictionaryStore = new DictionaryStore(AppDispatcher);

export default dictionaryStore;
