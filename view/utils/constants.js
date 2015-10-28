/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var keyMirror = require('react/lib/keyMirror');


// Events that are handled by main process has `_IPC` suffix
// All other events regardless of where they are created has no suffix nor prefix
module.exports = keyMirror({

  NEW_ROUTE_AVAILABLE: null,

  // Dictionary
  CREATE_DICTIONARY: null,
  UPDATE_DICTIONARY: null,
  DESTROY_DICTIONARY: null,
  LOAD_DICTIONARIES: null,

  DICTIONARIES_LOADED: null,
  DICTIONARY_ADDED: null,
  CREATE_DICTIONARY_IPC: null,
  DICTIONARY_CREATED: null,
  UPDATE_DICTIONARY_IPC: null,
  DICTIONARY_UPDATED_IPC: null,
  DICTIONARIES_LOADED_IPC: null,
  LOAD_DICTIONARIES_IPC: null,

  // Definition
  CREATE_DEFINITION: null,
  CREATE_DEFINITION_IPC: null,
  DEFINITION_CREATED: null,

  UPDATE_DEFINITION: null,
  UPDATE_DEFINITION_IPC: null,
  DEFINITION_UPDATED: null,

  LOAD_DEFINITIONS: null,
  LOAD_DEFINITIONS_IPC: null,
  DEFINITIONS_LOADED: null,

  __lastItem__: null
});
