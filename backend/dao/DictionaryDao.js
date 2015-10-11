/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var ipc = require('ipc');
var Dictionary = require('../model/Dictionary');

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

ipc.on('dictionary-create', function(event, dictionaryObj) {
  console.log(dictionaryObj);

  dictionaryDao.create()
    .then(function (createdModel) {
      event.sender.send('dictionary-created', createdModel.dataValues);
    });

});

module.exports = dictionaryDao;
