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
    isCorrect : 'correct'
};

function initialConfiguration(alexaEvent){
    alexaEvent.model.resources = resources;
    let translatedQuestions = alexaEvent.model.resources.questions;

    //Set Random questions index
    let gameQuestions = populateGameQuestions(translatedQuestions);
    alexaEvent.model.resources.questionsReordered = gameQuestions;
}

function isValidAnswer(response){
    let isValid = false;

    //Validating number
    if(response.Number && !isNaN(parseInt(response.Number)))
        isValid = true;
    //Validating person name
    else if(response.Person && response.Person.length > 0)
        isValid = true;
    else if(response.Country && response.Country.length > 0)
        isValid = true;

    return isValid;
}

function handleResponse(alexaEvent){
    let
        data = alexaEvent.model.resources,
        questions = data.questions,

        currIndex = data.currIndex,
        questionsIndex = data.questionsReordered[currIndex],

        currQuestion = questions[questionsIndex],
        currAnswers = currQuestion[0],

        spokenQuestion = Object.keys(currQuestion),
        spokenAnswer = generateResponse(currAnswers),

        correctAnswer = currAnswers[0],
        correctAnswerIndex = 0;


    //Checking response, editing score
    let res = alexaEvent.intent.params;
    alexaEvent.model.resources.isCorrect = 'wrong';

    //Number
    if(res.Number){
        let val = parseInt(res.Number);
        if(val < (data.answerCount + 1) && ( val ==  correctAnswerIndex) || (val == correctAnswer)){
            alexaEvent.model.resources.score ++;
            alexaEvent.model.resources.isCorrect = 'correct';
        }
    }
    //Country
    else if(res.Country && res.Country.toLowerCase() == correctAnswer.toLowerCase()){
        alexaEvent.model.resources.score ++;
        alexaEvent.model.resources.isCorrect = 'correct';
    }
    //Person names
    else if(res.Person && res.Person.toLowerCase() == correctAnswer.toLowerCase()){
        alexaEvent.model.resources.score ++;
        alexaEvent.model.resources.isCorrect = 'correct';
    }


    //Setting up new question to be told
    let speechOutput = "";


    //tell question number
    speechOutput += data.tellQuestion(currIndex,data.gameLength);
    //tell question
    speechOutput += spokenQuestion;
    //tell answers
    speechOutput += spokenAnswer;


    alexaEvent.model.resources.currQuestion = speechOutput;
    alexaEvent.model.resources.currIndex ++;
}

function generateResponse(answers){
    let res = "";
    for(let i = 0; i < answers.length; i++){
         res += `${i}. ${answers[i]}. `;
    }
    return res;
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


exports.register = (skill) => {


    //On alexa user intents
    skill.onIntent('LaunchIntent', (alexaEvent) => {
        //Initial Configuration
        initialConfiguration(alexaEvent);
        //Generating first question
        handleResponse();
        return { reply: 'Intent.Launch', to: 'entry' }
    });

    skill.onIntent('AnswerIntent', (alexaEvent) => {

        let
            data = alexaEvent.model.resources,
            currIndex = data.currIndex,
            gameLen = data.gameLength,
            res = alexaEvent.intent.params;

        console.log(data);
        console.log(res);


        //validate if the game is ended
        if(currIndex == gameLen - 1){
            return { reply: 'Intent.Finish', to: 'die' };
        }

        if(!isValidAnswer((res))){
            return { reply: 'Intent.Error', to: 'die' };
        }
        else{
            handleResponse(alexaEvent);
            return { reply: 'Intent.Question', to: 'die' };
        }

    });

};