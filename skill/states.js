'use strict';
const questions = require('./data/questions');
let resources = {
    answerCount : 4,
    gameLength : 10,
    currIndex : 0,
    score: 0,
    gameStatus : {
        trivia: '_TRIVIAMODE',
        start: '_STARTMODE',
        help: '_HELPMODE'
    },
    gameName : 'Football Soccer Trivia',
    welcomeMessage : 'Welcome to %s. I will ask you %s questions, try to get as many right as you can. Let\'s begin. ',
    questions : questions['QUESTIONS_EN_US'],
    questionsReordered : [],


    correctAnswerMessage : 'The correct answer is %s: %s. ',

    answerIsMessage : 'That answer is ',
    answerCorrectMessage : 'correct. ',
    answerWrongMessage : 'wrong. ',

    tellQuestion : 'Question %s of %s. ',
    gameOver : 'You got %s out of %s questions correct. Thank you for playing!',
    scoreMessage : 'Your score is %s. ',

    noMessage : 'Ok, we\'ll play another time. Goodbye!'
};

exports.register = function register(skill) {


    //On alexa user intents
    skill.onIntent('LaunchIntent', (alexaEvent) => {
        alexaEvent.model.resources = resources;
        let translatedQuestions = alexaEvent.model.resources.questions;

        //Random questions
        let gameQuestions = populateGameQuestions(translatedQuestions);
        console.log(gameQuestions);
        alexaEvent.model.resources.questionsReordered = gameQuestions;

        return { reply: 'Intent.Launch', to: 'entry' }
    });

    skill.onIntent('AnswerIntent', (alexaEvent) => {

        let data = alexaEvent.model.resources, res = alexaEvent.intent.params;
        console.log(data);
        console.log(res);


        return { reply: 'Intent.Question', to: 'die' };

        //let intent = alexaEvent.intent;
        //console.log(_response);

        //console.log(resources);
        //console.log('index: ', resources.currIndex);
        //console.log('question: ', Object.keys(resources.questionsReordered[resources.currIndex]) );
        //console.log('response: ', intent.params);

    });

};

function handleQuestion(resources){
    let
        speechOutput = "",
        gameQuestions = resources.questionsReordered,
        currIndex = resources.currIndex,
        correctAnswerIndex = Math.floor(Math.random() * (resources.answerCount)),
        spokenQuestion = Object.keys(currIndex);

        //tell question number
        speechOutput += resources.tellQuestion(currIndex,resources.gameLength);
        //tell question
        speechOutput += spokenQuestion;
        return {  reply: 'Intent.Answer', to: 'responseState'  };
}

function handleResponse(resources){

}


function populateGameQuestions(translatedQuestions) {
    var gameQuestions = [];
    var indexList = [];
    var index = translatedQuestions.length;

    if (resources.gameLength > index){
        throw new Error("Invalid Game Length.");
    }

    for (var i = 0; i < translatedQuestions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < resources.gameLength; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}
function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation, translatedQuestions) {
    var answers = [];
    var answersCopy = translatedQuestions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(translatedQuestions[gameQuestionIndexes[correctAnswerIndex]])[0]].slice();

    var index = answersCopy.length;

    if (index < resources.ANSWER_COUNT) {
        throw new Error("Not enough answers for question. ", index, resources.ANSWER_COUNT);
    }

    // Shuffle the answers, excluding the first element which is the correct answer.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (var i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}