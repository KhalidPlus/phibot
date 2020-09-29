const fetch = require('node-fetch');


const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
async function playtime(username, args){
    var player = args[0];
    if(player == undefined) player = username;
    if(username_filter.test(player) == false){
        say('Invalid username.');
        return;
    }
    const requestInfo = await fetch(`https://minecraft-statistic.net/api/player/info/${player}/173557`);
    const info = await requestInfo.json();
    if(info.status != 'ok'){
        say('Player not found.');
        return;
    }
    if(info.data == undefined) return;
    say(`Player ${info.data.name} has ${info.data.total_time_play} minutes or ${Math.floor(info.data.total_time_play/60)} hours of playtime.`);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return playtime;
}
