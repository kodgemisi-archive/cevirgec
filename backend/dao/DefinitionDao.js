/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var ipc = require('ipc');
var Definition = require('../model/Definition');

var Constants = require('../../view/utils/constants');

var definitionDao = 'DAOs are event based so we only initialize them on main.js but not need to expilictly use them';

ipc.on(Constants.LOAD_DEFINITIONS_IPC, function(event, data) {
  console.log(Constants.LOAD_DEFINITIONS_IPC);

  Dictionary.findAll()
    .then(function (resultArray) {
      var values = resultArray
        .map(function (entity) {
          return entity.toJSON();
        });

      event.sender.send(Constants.DEFINITIONS_LOADED, values);
    });

});

ipc.on(Constants.CREATE_DEFINITION_IPC, function(event, data) {
  console.log(Constants.CREATE_DEFINITION_IPC, data);

  Definition.create(data)
    .then(function successHandler (createdEntity) {
      event.sender.send(Constants.DEFINITION_CREATED, createdEntity.toJSON());
    }, function errorHandler(argument) {
      console.log(argument);
    });
});


module.exports = definitionDao;
