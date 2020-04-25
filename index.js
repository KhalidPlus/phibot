//    PhiBot, a Minecraft bot for anarchy servers.
//    Copyright (C) 2019 Zipdox
//
//    This program is free software; you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation; either version 2 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.


const mineflayer = require('mineflayer');
const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");
const firebase = require('firebase');
const convert = require('convert-units');
const sqlite3 = require('sqlite3');
const exec = require('child_process').exec;
const calculate = require('mathjs').evaluate;
const mcping = require('./ping-promise');
const cleverbot = require('cleverbot-free');

var errorstream = fs.createWriteStream('errors.log', {flags:'a'});
var logstream = fs.createWriteStream('process.log', {flags:'a'});
process.on('uncaughtException', (err) => {
    errorstream.write(`${new Date().toUTCString()} ${err}\n`);
});
function logEvent(message){
    console.log(`${new Date().toUTCString()} ${message}`);
    logstream.write(`${new Date().toUTCString()} ${message}\n`);
}


const credentials = JSON.parse(fs.readFileSync('config/credentials.json', 'utf8'));
const admins = JSON.parse(fs.readFileSync('config/admins.json', 'utf8'));
const botdb = new sqlite3.Database('phibot.db');
var bot;


console.log(new Date().toUTCString());



var commands;
var chatevents;
function loadCommands(){
    commands = {};
    chatevents = [];
    for(var module of fs.readdirSync('modules/')){
        eval(fs.readFileSync(`modules/${module}`, 'utf8'));
        console.log("Finished loading", module);
    }
}
loadCommands();



const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");

const random = {
    int: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    float: function(min, max){
        return Math.random() * (max - min) + min;
    },
    pick: function(array){
        return array[Math.floor(Math.random() * Math.floor(array.length))];
    }
}

function greenText(text){
    say(`> ${text}`);
}

function whisper(user, text){
    bot.chat(`/w ${user} ${text}`);
}

function say(text){
    text = text.replace(/\n/g, ' ');
    if(text.length > 256){
        text = text.match(/.{1,256}/g)[0];
    }
    bot.chat(text);
}

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}



var waitingForOnline = false;
async function startBot(){
    let pingResponse = await mcping(credentials);
    if(pingResponse.errno){
        if(!waitingForOnline) logEvent('Not starting bot because server offline');
        waitingForOnline = true;
        setTimeout(startBot, 10000);
        return;
    };
    waitingForOnline = false;
    logEvent('Starting bot');

    bot = mineflayer.createBot(credentials);

    bot.on('login', function(){
        logEvent(`Logged in as ${bot.username}`);
    });

    bot.on('end', function(){
        logEvent('Connection ended');
        setTimeout(startBot, 10000);
    });

    bot.on('message', jsonMsg =>{
        onMessage(jsonMsg);
    });

    bot.on('whisper', (username, message) => {
        onWhisper(username, message);
    });

    bot.on('chat', (username, message, translate, jsonMsg) => {
        onChat(username, message, translate, jsonMsg);
    });

    bot.on('playerLeft', function(player){
        onPlayerLeft(player);
    });
}
startBot();




function shutDown(username){
    if(username){
        logEvent(`PhiBot shut down by ${username}`);
    }else{
        logEvent(`PhiBot shut down from console`);
    }
    console.log('one');
    say("Shutting down.");
    console.log('two');
    bot.quit();
    console.log('three');
    botdb.close();
    console.log('four');
    setTimeout(function(){
        exec('screen -S phibot -X stuff "^C"');
    }, 2000);
}



const colormap = {
    dark_red: "§4",
    red: "§c",
    gold: "§6",
    yellow: "§e",
    dark_green: "§2",
    green: "§a",
    aqua: "§b",
    dark_aqua: "§3",
    dark_blue: "§1",
    blue: "§9",
    light_purple: "§d",
    dark_purple: "§5",
    white: "§f",
    gray: "§7",
    dark_gray: "§8",
    black: "§0"
}

function onMessage(jsonMsg){
    //var message = jsonMsg.json.extra;
    var rawText = '';
    var messageArray = [];


    var msgText = '';
    function iterateMsg(jmessage){
        if(jmessage.text != undefined){
            if(jmessage.text.length > 0){
                rawText += jmessage.text;
                messageArray.push(jmessage);
            }
        }
        if(jmessage.extra != undefined){
            for(var msgPart of jmessage.extra){
                iterateMsg(msgPart);
            }
        }
    }
    iterateMsg(jsonMsg.json);
    //console.log(rawText);



    //for(var msgPart of message){
    //    if(msgPart.extra == undefined){
    //        if(msgPart.text.length > 0){
    //            messageArray.push(msgPart);
    //            rawText += msgPart.text;
    //        }
    //    }else if(msgPart.extra.length > 0){
    //        for(var nestedMsgPart of msgPart.extra){
    //            if(nestedMsgPart.text.length > 0){
    //                messageArray.push(nestedMsgPart);
    //                rawText += nestedMsgPart.text;
    //            }
    //        }
    //    }
    //}

    if(rawText.startsWith("Please type '")){
        bot.chat(rawText.split("'")[1]);
    }

    splitRawText = rawText.split(' ');
    splitRawText.shift();
    if(messageArray.length == 0 || rawText.trim().length == 0 || (splitRawText.join(' ') == 'has invited you in his party' || rawText == 'To accept/deny invitation type /party <accept/deny>') || messageArray[0].color == 'light_purple') return;

    finalText = '';

    for (i = 0; i < messageArray.length; i++) {
        if(messageArray[i].color != undefined) finalText += colormap[messageArray[i].color];
        if(messageArray[i].bold == true) finalText += '§l';
        if(messageArray[i].strikethrough == true) finalText += '§m';
        if(messageArray[i].underline == true) finalText += '§n';
        if(messageArray[i].italic == true) finalText += '§o';
        if(messageArray[i].obfuscated == true) finalText += '§k';
        finalText += messageArray[i].text;
        if((i+1) < messageArray.length && (messageArray[i].color != undefined || messageArray[i].bold == true || messageArray[i].strikethrough == true || messageArray[i].underline == true || messageArray[i].italic == true || messageArray[i].obfuscated == true)) finalText += '§r';
    }

    botdb.serialize(function(){
        var stmt = botdb.prepare("INSERT INTO chat VALUES (?,?);");
        stmt.run(Math.round(Date.now()/1000), finalText);
        stmt.finalize();
    });
};


var cleverbotConvos = {};
async function onWhisper(username, message){
    if(admins[bot.players[username].uuid] != undefined){
        if(message.startsWith('shutdown')){
            shutDown(username);
        }else{
            say(message);
        }
    }else{
        // for(var admin in admins){
        //     if(bot.players[admins[admin]] != undefined) say(`/w ${admins[admin]} <${username}> ${message}`);
        // }
        if(cleverbotConvos[username] == undefined){
            cleverbotConvos[username] = [];
            const response = await cleverbot(message)
            cleverbotConvos[username].push(message);
            cleverbotConvos[username].push(response);
            whisper(username, response);
        }else{
            const response = await cleverbot(message, cleverbotConvos[username]);
            cleverbotConvos[username].push(message);
            cleverbotConvos[username].push(response);
            whisper(username, response);
        }
    }
};


function onChat(username, message, translate, jsonMsg){
    if(username == bot.username) return;
    if(jsonMsg.extra[0].color == 'light_purple') return;
    for(var chatevent of chatevents){
        chatevent(username, message, translate, jsonMsg);
    }

    if(message.indexOf('?') != 0) return;
    var args = message.replace('?', '').split(' ');
    var command = args.shift().toLowerCase();
    if(commands[command] == undefined) return;
    commands[command](username, args);

};


function onPlayerLeft(player){
    return;
};


setInterval(function(){
    if(bot.entity != undefined){
        var yaw = Math.random() * 2 * Math.PI - Math.PI;
        var pitch = Math.random() * Math.PI - (0.5 * Math.PI);
        bot.look(yaw, pitch, true);
    }
}, 12000);

setInterval(function(){
    if(bot.entity == undefined) startBot();
    commands["fact"]();
}, 300000);
