/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import type {Action} from './TodoActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Dictionary from '../entity/Dictionary';
import TodoDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';

// Set up the store, If we didn't care about order we could just use MapStore
type State = Immutable.OrderedMap<string, Dictionary>;

class TodoStore extends ReduceStore<string, Dictionary> {
  getInitialState(): State {
    return Immutable.OrderedMap();
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {
      case Constants.DICTIONARY_DESTROY:
        return state.setIn([action.id, 'complete'], true);

      case Constants.DICTIONARY_CREATE:
        return createTodo(state, action.name);

      default:
        return state;
    }
  }

  areAllComplete(): boolean {
    return this.getState().every(todo => todo.complete);
  }
}

// Pure helper function to create a new Todo and add it to the state.
function createTodo(state: State, text: ?string): State {
  if (!text) {
    return state;
  }
  var newTodo = new Dictionary(text);
  return state.set(newTodo.id, newTodo);
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new TodoStore(TodoDispatcher);
export default instance;