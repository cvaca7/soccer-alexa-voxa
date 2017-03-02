'use strict';

const views = (function views() => {
    return {
        Intent : {
            Launch : {
                tell : 'Welcome to Soccer trivia!'
            },
            Help : {
                stay : 'Do you want to get back on playing?'
            }
        }
    }
} )();

module.exports = views;