//OFFICAL ONE USED AT SUNHACKS2018

// step : used to trasition to the next element in array

// Alexa open easycook, [grilled or pbj], open easycook, step

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================

const pbj = [
    '1 teaspoon peanut butter',
    '2 teaspoons any flavor fruit jelly',
    '2 slices of bread',
    'Heat griddle or skillet to 350 degrees F (175 degrees C).',
    'Spread butter on one side of each slice of bread.',
    'Spread peanut butter on unbuttered side of one slice of bread, and jelly on the other.',
    'Place one slice, buttered side down on the griddle.',
    'Top with other slice, so that peanut butter and jelly are in the middle.',
    'Cook for 4 minutes on each side, or until golden brown, and heated through.',
    ];
    
const grilled = [
    '4 slices white bread',
    '3 tablespoons butter, divided',
    '2 slices Cheddar cheese',
    'Preheat skillet over medium heat.',
    'Generously butter one side of a slice of bread.', 
    'Place bread butter-side-down onto skillet bottom and add 1 slice of cheese.',
    'Butter a second slice of bread on one side and place butter-side-up on top of sandwich.',
    'Grill until lightly browned and flip over; continue grilling until cheese is melted.',
    'Repeat with remaining 2 slices of bread, butter and slice of cheese.',
];



//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

        var i = 0;
        var start = 0;
        var data;
        
        var one = '';
const handlers = { 
    'LaunchRequest': function () {
        if (start == 0)
        {
        this.emit(':ask', 'What do you need instructions for?', 'Anything specific');
        start++;
        }
        
        else
        {
            this.emit(':ask', 'Ready for next step' );
             start++;
        } 
        
    },
    'Pizza' : function ()
    {
        data = grilled;
            one = data[i];   
           //if (i == 0) 
            this.emit(':tell', 'Recipe for grilled cheese found. \n' + one);
            //else 
           // this.emit(':tell', one);
            i++;
        
    },
    
    'Next' : function() 
    {
        if (i == data.length)//base case
        {
            this.emit(':tell', 'Finished steps');
            i = 0; 
            start = 0; 
    }
        else if (i > 0)
        {
            one = data[i];
            this.emit(':tell', one);
            i++;
        }
    },
    'PBJ' : function ()
    {
        data = pbj;
           one = data[i];   
          //if (i == 0)
            this.emit(':tell', 'Recipe for pbj found. \n' + one);
           // else 
            //this.emit(':tell', one);
            i++;
        
    },
    
    'GetFact': function () {
        var ingredients = [];
        const factArr = ingredients;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;
 
        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
