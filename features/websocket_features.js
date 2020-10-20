/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require("botkit");
const express = require('express');
const path = require('path');
const resume = require('../chat/resume');

const quickLinks = [
        {
            title: 'Personal Information',
            payload: ``,
        },
        {
            title: 'Work experience',
            payload: 'work',
        },
        {
            title: 'Education',
            payload: 'education',
        },
        {
            title: 'Skills',
            payload: 'skills',
        },
        {
            title: 'Profiles',
            payload: 'profiles',
        },
    ]



module.exports = function(controller) {

    let DIALOG_ID = 'my_dialog_1';
    let myDialog = new BotkitConversation(DIALOG_ID, controller);
    myDialog.say('Hello!');
    myDialog.say('Welcome to the world of bots!');
    controller.addDialog(myDialog);

    if (controller.adapter.name === 'Web Adapter') {

        // console.log('Loading sample web features...');

        controller.hears(new RegExp('resume'), 'message', async (bot, message) => {

            await bot.reply(message, quickLinks);
        });


    }

};

module.exports = function(controller) {
    let DIALOG_ID = 'Welcome_dialog';
    let myDialog = new BotkitConversation(DIALOG_ID, controller);
    myDialog.say('Hello!');
    myDialog.say("Welcome to my bot!");
    controller.addDialog(myDialog);

    if (controller.adapter.name === 'Web Adapter') {

        // console.log('Loading sample web features...');


        controller.on('hello', async (bot, message) => {
            await bot.beginDialog(DIALOG_ID);
            await bot.reply(message, {
                text: 'Try typing something or select some of the quick messages from below',
                quick_replies: [
                    {
                        title: 'Foo',
                        payload: `${resume.basics.name}`,
                    },
                    {
                        title: 'Bar',
                        payload: 'bar',
                    },
                    {
                        title: `Work`,
                        payload: `${resume.work}`,
                    },
                    {
                        title: 'hello',
                        payload: 'Hello',
                    },
                    {
                        title: 'HI',
                        payload: 'hey',
                    },
                ]
            });
        });


    }

};