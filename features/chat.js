/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require("botkit");
const express = require('express');
const path = require('path');
const resume = require('./resume');
console.log(resume.resume);

module.exports = function(controller) {

    // make public/index.html available as localhost/index.html
    // by making the /public folder a static/public asset
    controller.publicFolder('/', path.join(__dirname,'..','public'));

    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000));

    let typing = new BotkitConversation('typing', controller);

    typing.say('I am going to type for a while now...');
    typing.addAction('typing');

    // start the typing indicator
    typing.addMessage({ type: 'typing' }, 'typing');
    // trigger a gotoThread, which gives us an opportunity to delay the next message
    typing.addAction('next_thread', 'typing');

    typing.addMessage('typed!', 'next_thread');

    // use the before handler to delay the next message 
    typing.before('next_thread', async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    controller.addDialog(typing);

    controller.hears('typing dialog', 'message', async (bot, message) => {
        await bot.beginDialog('typing');
    });

    controller.hears('typing reply', 'message', async (bot, message) => {

        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, 'Typed!');
        }, 1000);
    });
}