'use strict';


const views = (() => {
    return {
        Intent : {
            Launch : {
                tell : `Welcome to Soccer Trivia I will ask you some questions, try to get as many right as you can. Let\'s begin.`
            },
            Stop : {
                stay : 'Thank you for being playing with me, we\'ll play another time. Goodbye!'
            },
            doSomething: {
                tell: 'Something about response!'
            }
        }
    }
} )();

module.exports = views;