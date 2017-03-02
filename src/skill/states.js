'use strict';
exports.register = (skill) => {
    skill
        .onIntent('LaunchIntent', () => ( { reply: 'Intent.Launch', to: 'entry' } ) )
        .onIntent('AMAZON.HelpIntent', () => ( { reply: 'Intent.Help', to: 'die' } ) )
};