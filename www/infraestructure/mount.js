'use strict';
const
    fs = require('fs'),
    path = require('path'),
    S = requie('string');

module.exports = function mount(dirname) => {
    const router = require('express').Router();

    const files = fs.readdirSync(dirname);
    files.forEach( (route)=> {
        if( S(route).endsWith('index.js') ) return;

        const controller = require(path.join(dirname, route) );
        if(!controller.router) return;

        router.use(controller.mountPath || '', controller.router);
    } );

    return router;
};