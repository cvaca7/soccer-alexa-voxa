'use strict';
const skill = require('./MainStateMachine');

exports.handler = (event, context, callback) => {
    skill.execute(event)
        .then(response => callback(null,response))
        .catch(error => callback(error));
};