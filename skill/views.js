'use strict';

const views = (() => {
    return {
        Intent : {
            Launch : {
                tell : 'Welcome to Soccer trivia!'
            },
            Help : {
                stay : 'Do you want to get back on playing?'
            },
            doSomething: {
                tell: 'Hello, welcome!'
            }
        }
    }
} )();

module.exports = views;