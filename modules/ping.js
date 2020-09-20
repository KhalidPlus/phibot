const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var playerList;
function ping(username, args){
    var player = args[0];
    if(player == undefined) player = username;
    if(username_filter.test(player) == false){
        say('Invalid username.');
        return;
    }
    if(playerList()[player] != undefined){
        if(playerList()[player].ping > 0){
            say(`${player}'s ping is ${playerList()[player].ping}ms.`);
        }else{
            say(`${player} hasn't been pinged by the server yet.`);
        }
    }else{
        say(`${player} is not online.`);
    }
}

module.exports = function(sayFunc, playerListFunc){
    say = sayFunc;
    playerList = playerListFunc;
    return ping;
}