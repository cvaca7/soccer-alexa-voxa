'use strict';

const
    app = require('express')(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http'),
    routes = require('./routes'),
    config = require('../config'),
    env = require('../config/env');


console.log(`Attemptiing to start. \r\n\t
            'Node version: ' ${ process.version } \r\n\t
            'NODE_ENV: ' ${ env }`);

app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded( { extended: false } ) )
    .use(routes.router);

const server = http.createServer(app);
server.listen(config.server.port, () => {
    console.log('Server listening on port %d.', config.server.port);
});
