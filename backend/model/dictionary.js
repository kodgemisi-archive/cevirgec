'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../sequelize');
var Definition = require('./definition');

var Dictionary = sequelize.define('dictionary', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  sourceLanguage: {
    type: Sequelize.STRING
  },
  targetLanguage: {
    type: Sequelize.STRING
  },
  context: {
    type: Sequelize.STRING
  },
},
{
  freezeTableName: true
});

Dictionary.hasMany(Definition);

Dictionary.sync();
Definition.sync();// use here in order associations to take effect

module.exports = Dictionary;
