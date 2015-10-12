/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../Sequelize');
var Definition = require('./Definition');

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
  active: {
    type: Sequelize.BOOLEAN
  }
},
{
  freezeTableName: true
});

Dictionary.hasMany(Definition);

Dictionary.sync();
Definition.sync();// use here in order associations to take effect

module.exports = Dictionary;
