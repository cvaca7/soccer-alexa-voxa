/**
 * Created by carlosvaca on 3/9/17.
 */
const _questions = require('./questions');

module.exports = {
    answerCount : 4,
    gameLength : 10,

    currIndex : 0,
    currQuestion : '',
    score: 0,

    questions : _questions['QUESTIONS_EN_US'],
    questionsReordered : [],
    isCorrect : 'correct'
};