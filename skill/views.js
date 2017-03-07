'use strict';

let br = '<br></br>', timeBreak = '<break time="0.5s"/>';
const views = (() => {

    return {
        Intent : {
            Launch : {
                tell : `Welcome to Soccer Trivia I will ask you some questions, try to get as many right as you can. Let\'s begin. ${timeBreak} {question}`
            }, //{question}
            Question: {
                tell: `Your answer is {isCorrect}, your score now is {score}. ${timeBreak} Next Question. ${timeBreak} ${br} {question}`
            },
            Error : {
              tell: `Your answer is incorrect, please repeat it again.`
            },
            Finish : {
                stay : 'Thank you for being playing with me, we\'ll play another time. Goodbye!'
            }

        }
    }
} )();

module.exports = views;