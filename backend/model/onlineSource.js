'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var OnlineSource = sequelize.define('onlineSource', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  sourceLang: {
    type: Sequelize.STRING
  },
  index: {
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true
});

OnlineSource.sync();

module.exports = OnlineSource;