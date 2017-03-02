'use strict';
const gulp = require('gulp'), nodemon = require('gulp-nodemon');

gulp
    .task('watch', () =>{
        nodemon({
           script: 'www/server.js',
            watch: [ 'www/*', 'config/*', 'services/*', 'skill/*' ],
            ext: 'json js',
            ignore: [ 'node_modules/**/*' ]
        });
    })
    .task('run', () => {
       require('./www/server');
    });
