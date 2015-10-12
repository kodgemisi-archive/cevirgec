/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

  // DictionaryDao
  DICTIONARY_CREATE: null,
  DICTIONARY_DESTROY: null,
  LOAD_DICTIONARIES: null,

  // DictionaryStore
  DICTIONARIES_LOADED: null,
  DICTIONARY_ADDED: null,

  // IPC
  DICTIONARY_CREATE_IPC: null,
  DICTIONARY_CREATED_IPC: null,
  DICTIONARIES_LOADED_IPC: null,
  LOAD_DICTIONARIES_IPC: null
});
