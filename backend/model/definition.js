'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Type = [
  'NONE',
  'NOUN',
  'VERB',
  'VERB_TRANSITIVE',
  'VERB_NON_TRANSITIVE',
  'ADJECTIVE',
  'ADVERB',
  'PRONOUN',
  'PREPOSITION',
  'CONJUNCTION',
  'INTERJECTION',
  'PHRASAL_VERBS',
  'IDIOM',
  'PHRASE'
];

var Sex = [
  'NEUTER',
  'MASCULINE',
  'FEMININE'
];

var Definition = sequelize.define('definition', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  },
  usage: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.ENUM,
    values: Type
  },
  sex: {
    type: Sequelize.ENUM,
    values: Sex
  }
},
{
  freezeTableName: true
});

module.exports = Definition;