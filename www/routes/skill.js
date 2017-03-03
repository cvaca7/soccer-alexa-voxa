'use strict';

const
    router = require('express').Router(),
    skill = require('../../skill'),
    config = require('../../config');

exports.mountPath = '/skill';

if(config.server.hostSkill){
    router.post('/', (request,response,next) => {
        skill.handler( request.body, {
            fail: next,
            succeed: (msg) => {
                response.json(msg);
            }
        }, (err,msg) =>{
            if(err) return next(err);
            return response.json(msg);
        } );
    });
}

exports.router = router;