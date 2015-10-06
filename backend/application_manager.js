/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var jetpack = require('fs-jetpack');
var app = require('app');

var APP_NAME = 'cevirgec';

module.exports = (function() {

  var appDataPath = app.getPath('userData');

  // Ensure appDataPath exists
  jetpack.dir(appDataPath);

  var databaseFilePath = jetpack.path(appDataPath, 'database.sqlite');

  return {
    databaseFilePath: databaseFilePath
  };
})();