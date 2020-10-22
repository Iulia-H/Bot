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
        title: 'Projects',
        payload: 'projects',
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
                    title: 'Eagle Relocations',
                    payload: `Eagle Relocations`,
                },
                {
                    title: 'Hilton Hotel',
                    payload: 'Hilton Hotel',
                },
                {
                    title: 'Tim Hortons',
                    payload: 'Tim Hortons',
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
                    title: 'University of Manchester',
                    payload: `University of Manchester`,
                },
                {
                    title: 'App Academy',
                    payload: 'academy',
                },
                {
                    title: 'Resume',
                    payload: "resume"
                }
            ]

        });
    });

    controller.hears('projects','message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, {
            text: "Please choose what kind of skills you'd like to explore",
            quick_replies: [
                {
                    title: 'Twinkle',
                    payload: `Twinkle`,
                },
                {
                    title: 'Loot',
                    payload: 'Loot',
                },
                {
                    title: 'Potion-Catcher',
                    payload: 'Potion-Catcher',
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
                    title: 'Boadgames',
                    payload: `boardgames`,
                },
                {
                    title: 'Soap making',
                    payload: 'soapmaking',
                },
                {
                    title: 'Gaming',
                    payload: "gaming"
                },
                {
                    title: '3D Design',
                    payload: '3D design',
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


    controller.hears('university', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.education.institution1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('academy', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.education.institution2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('Twinkle', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.projects.project1}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('Loot', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.projects.project2}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('Potion-Catcher', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.projects.project3}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('boardgames', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.interests.boardgames}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('soapmaking', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.interests.soapmaking}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });

    controller.hears('design', 'message,direct_message', async (bot, message) => {
        await bot.beginDialog('typing');
        await bot.reply(message, `${resume.interests.design}`);
        await bot.reply(message, {
            text: "Otherwise please check some other links",
            quick_replies: quickLinks
        });
    });
};


