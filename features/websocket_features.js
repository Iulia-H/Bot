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
        payload: `info`,
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
    }
];


module.exports = function(controller) {
    let WELCOME = 'Welcome_dialog';
    let welcomeDialog = new BotkitConversation(WELCOME, controller);
    welcomeDialog.say('Hello!');
    welcomeDialog.say("Welcome to my bot!");
    controller.addDialog(welcomeDialog);

    if (controller.adapter.name === 'Web Adapter') {
        controller.on('hello', async (bot, message) => {
            await bot.beginDialog(WELCOME);
            await bot.beginDialog('typing');
            await bot.reply(message, {
                text: 'Try typing something or select some of the quick messages from below',
                quick_replies: quickLinks
                
            });
        });
    }
    controller.hears('info','message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Here's some of my personal information, please click one of the suggestions for more information",
            quick_replies: [
                {
                    title: 'Name',
                    payload: `name`,
                },
                {
                    title: 'Email',
                    payload: 'email',
                },
                {
                    title: 'Phone number',
                    payload: 'number',
                },
                {
                    title: 'LinkedIn',
                    payload: 'profile',
                },
                {
                    title: 'Summary',
                    payload: 'summary',
                },
                {
                    title: 'Location',
                    payload: 'location',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('work','message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: 'This is my work history, please select a company to find out more about my time there',
            quick_replies: [
                {
                    title: 'Company 1',
                    payload: `Company 1`,
                },
                {
                    title: 'Company 2',
                    payload: 'Company 2',
                },
                {
                    title: 'Company 3',
                    payload: 'Company 3',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('education','message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Here's my education history. Click on one to find more about it",
            quick_replies: [
                {
                    title: 'Education 1',
                    payload: `Education 1`,
                },
                {
                    title: 'Education 2',
                    payload: 'Education 2',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('skills','message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Please choose what kind of skills you'd like to explore",
            quick_replies: [
                {
                    title: 'Skills 1',
                    payload: `Skills 1`,
                },
                {
                    title: 'Skills 2',
                    payload: 'Skills 2',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('interests','message,direct_message', async (bot, message) => {
        await bot.beginDialog(WELCOME);
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Here's some stuff I'm interested in",
            quick_replies:  [
                {
                    title: 'Interest 1',
                    payload: `Interest 1`,
                },
                {
                    title: 'Interest 2',
                    payload: 'Interest 2',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('resume', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Please choose what information you'd like to see",
            quick_replies: quickLinks
        });
    });


    controller.hears('name', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `My name is ${resume.basics.name}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });


    controller.hears('email', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `My email is ${resume.basics.email}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });


    controller.hears('number', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `My phone number is ${resume.basics.phone}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });



    controller.hears('profile', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `The link to my profile is ${resume.basics.profile}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });



    controller.hears('summary', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.basics.summary}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('company 1', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.work.company1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('company 2', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.work.company2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('company 3', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.work.company3}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('institution1', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.education.institution1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('institution 2', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.education.institution2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('skill 1', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.skills.skill1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('skill 2', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.skills.skill2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('interest1', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.interests.interest1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('interest2', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.interests.interest2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });
};


