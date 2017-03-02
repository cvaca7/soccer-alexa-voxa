'use strict';
const
    Voxa = require('voxa'),
    views = require('./views'),
    variables = require('./variables'),
    states = require('./states');

const skill = new Voxa( { variables, views } );
states.register(skill);
module.exports = skill;