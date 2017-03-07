'use strict';

exports.resources = (model)  => {
    return model.resources;
};

exports.question = (model) => {
    return model.resources.currQuestion;
};

exports.isCorrect = (model) => {
  return model.resources.isCorrect;
};

exports.score = (model) => {
    return model.resources.score
};