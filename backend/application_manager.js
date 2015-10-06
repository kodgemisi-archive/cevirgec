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