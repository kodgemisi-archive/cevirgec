/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import type {Action} from './TodoActions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import AppDispatcher, {dispatch} from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';

class BreadcrumbStore extends ReduceStore {

  getInitialState() {
    return new Immutable.List();
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {

      case Constants.NEW_ROUTE_AVAILABLE:

        var routes = action.data.filter(function (route) {
          return route.path && route.name;
        })

        return new Immutable.List(routes);

      default:
        return state;
    }
  }

  getRoutes() {
    return this.getState().toArray();
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const breadcrumbStore = new BreadcrumbStore(AppDispatcher);

export default breadcrumbStore;
