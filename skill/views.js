'use strict';

let br = '<br></br>', timeBreak = '<break time="0.5s"/>';
const views = (() => {

    return {
        Intent : {
            Launch : {
                ask : `Welcome to Soccer Trivia, I will ask you some questions, try to get as many right as you can.
                 Let\'s begin. ${timeBreak} {question}`
            },
            Question: {
                ask: `Your answer is {isCorrect}, your score now is {score}. ${timeBreak} 
                Next Question. ${timeBreak}  {question}`
            },
            Error : {
                tell: `And error was ocurred {error}`
            },
            Finish : {
                tell : `Your answer is {isCorrect}, your score was {score}. ${timeBreak}  
                Thank you for being playing with me, we\'ll play another time. Goodbye!`
            }

        }
    }
} )();

module.exports = views;