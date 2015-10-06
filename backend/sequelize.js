'use strict';

var Sequelize = require('sequelize');
var applicationManager = require('./application_manager');

var sequelize = new Sequelize('', '', null, {
  dialect: 'sqlite',
  storage: applicationManager.databaseFilePath
});

console.log('Using db path: ' + applicationManager.databaseFilePath);

module.exports = sequelize;