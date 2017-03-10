'use strict';

exports.register = (skill) => {
    //On alexa user intents
    skill.onIntent('LaunchIntent', (alexaEvent) => {
        
        //Initial Configuration
        initialConfiguration(alexaEvent);
        
        //Generating first question
        handleOutput(alexaEvent);
        
        return { reply: 'Intent.Launch', to: 'entry' }
    });

    skill.onIntent('AMAZON.HelpIntent', (alexaEvent) => {
        return { reply: 'Intent.Help', to: 'entry' };
    });

    skill.onState('help', (alexaEvent) => {

    });

    skill.onIntent('AnswerIntent', (alexaEvent) => {
        let data = alexaEvent.model.resources;
        try{
            //validate if the game is ended
            if(data.currIndex == data.gameLength - 1){
                handleInput(alexaEvent);
                return { reply: 'Intent.Finish', to: 'die' };
            }

            let slots = alexaEvent.intent.params;
            console.log('slots: ' + JSON.stringify(slots));

            if(!isValidAnswer((slots))){
                return { reply: 'Intent.Error', to: 'die' };
            }
            else{
                handleOutput(alexaEvent);
                return { reply: 'Intent.Question', to: 'entry' };
            }
        }
        catch (err){
            resetGame(data);

            console.log('err: ', err.message);
            alexaEvent.model.resources.error = err.message;

            return { reply: 'Intent.Error', to: 'die' };
        }


    });

};

function initialConfiguration(alexaEvent){
    //Setting up my resources
    let resources = require('./data/resources');
    alexaEvent.model.resources = resources;

    //Hard resetting game
    resetGame(alexaEvent.model.resources);

    //Set Random questions index
    alexaEvent.model.resources.questionsReordered = populateGameQuestions(alexaEvent.model.resources);
}

function populateGameQuestions(resources) {
    let gameQuestions = [],
        indexList = [],
        index = resources.questions.length;

    if (resources.gameLength > index){
        throw new Error("Invalid Game Length.");
    }

    for (let i = 0; i < index; i++){
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

function resetGame(resources){
    resources.isCorrect = 'wrong';
    resources.score = resources.currIndex = 0;
}



function handleOutput(alexaEvent){
    
   //handling user response, if any
    handleInput(alexaEvent);

    //Preparing next question and answer
    let data = alexaEvent.model.resources,
        currIndex = data.currIndex,
        questions = data.questions,
        questionsIndex = data.questionsReordered[currIndex],

        currQuestionObj = questions[questionsIndex],
        answers = Object.values(currQuestionObj)[0],

        spokenQuestion = Object.keys(currQuestionObj)[0],
        spokenAnswer = generateResponse(answers);

    //Setting up new question to be told
    let speechOutput = "";


    //tell question number
    speechOutput += `Question ${currIndex + 1} of ${data.gameLength}. `;
    //tell question
    speechOutput += spokenQuestion + '. ' ;
    //tell answers
    speechOutput += spokenAnswer;

    console.log('speechOutput',speechOutput);

    alexaEvent.model.resources.currQuestion = speechOutput;
    alexaEvent.model.resources.currIndex ++;
}

function handleInput(alexaEvent){
    let data = alexaEvent.model.resources,
        currIndex = data.currIndex;

    //Checking for response, is any
    if(currIndex > 0){
        let questions = data.questions,
            questionsIndex = data.questionsReordered[currIndex - 1],

            currQuestionObj = questions[questionsIndex],
            answers = Object.values(currQuestionObj)[0],

            correctAnswerIndex = 0,
            correctAnswer = answers[correctAnswerIndex];

        //Checking response, editing score
        console.log('correctAnswer ', correctAnswer);

        let res = alexaEvent.intent.params;
        alexaEvent.model.resources.isCorrect = 'wrong';

        if(res.Person){
            let person = correctAnswer.toLowerCase().indexOf(res.Person.toLowerCase());
            console.log('person', person, person >=0);
        }

        if(res.Country){
            let country = correctAnswer.toLowerCase().indexOf(res.Country.toLowerCase());
            console.log('country', country, country >=0);
        }

        //Number
        if(res.Number){
            let val = parseInt(res.Number);
            if( val ==  (correctAnswerIndex + 1) || val == correctAnswer){
                alexaEvent.model.resources.score ++;
                alexaEvent.model.resources.isCorrect = 'correct';
            }
        }
        //Person names
        else if(res.Person && correctAnswer.toLowerCase().indexOf(res.Person.toLowerCase()) >= 0){
            alexaEvent.model.resources.score ++;
            alexaEvent.model.resources.isCorrect = 'correct';
        }
        //Country
        else if(res.Country && correctAnswer.toLowerCase().indexOf(res.Country.toLowerCase()) >= 0){
            alexaEvent.model.resources.score ++;
            alexaEvent.model.resources.isCorrect = 'correct';
        }
    }

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
function generateResponse(answers){
    let res = "";
    for(var i = 0; i < answers.length; i++){
         res += `${i + 1}. ${answers[i]}. `;
    }
    return res;
}



