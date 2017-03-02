'use strict';
const skill = require('./MainStateMachine');
require('./states');

exports.handler = (event, context, callback) => {
    skill.execute(event)
        .then(response => callback(null,response))
        .catch(error => callback(error));
};