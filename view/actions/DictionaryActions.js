/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../utils/constants';

var DictionaryActions = {
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.DICTIONARY_CREATE,
      text: text
    });
  },
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.DICTIONARY_DESTROY,
      id: id
    });
  },
};

module.exports = DictionaryActions;
