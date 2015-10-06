/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var Sequelize = require('sequelize');
var applicationManager = require('./ApplicationManager');

var sequelize = new Sequelize('', '', null, {
  dialect: 'sqlite',
  storage: applicationManager.databaseFilePath
});

console.log('Using db path: ' + applicationManager.databaseFilePath);

module.exports = sequelize;