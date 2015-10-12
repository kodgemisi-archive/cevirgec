/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var ipc = require('ipc');
var Dictionary = require('../model/Dictionary');

var Constants = require('../../view/utils/constants');

class DictionaryDao {
  constructor() {
  }

  create(dictionary) {
    return Dictionary.create({
      name: 'bilisim'
    });
  }
}

var dictionaryDao = new DictionaryDao();

ipc.on(Constants.LOAD_DICTIONARIES_IPC, function(event, data) {
  console.log('LOAD_DICTIONARIES_IPC');

  Dictionary.findAll()
    .then(function (resultArray) {
      var values = resultArray
        .map(function (entity) {
          return entity.dataValues;
        });

      event.sender.send(Constants.DICTIONARIES_LOADED_IPC, values);
    });

});

ipc.on(Constants.DICTIONARY_CREATE_IPC, function(event, dictionaryObj) {
  console.log('DICTIONARY_CREATE_IPC', dictionaryObj);

  Dictionary.create(dictionaryObj)
    .then(function (createdModel) {
      event.sender.send(Constants.DICTIONARY_CREATED_IPC, createdModel.dataValues);
    });

});


module.exports = dictionaryDao;
