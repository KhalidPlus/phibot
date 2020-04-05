commands['bestping'] = commands['bp'] = function(){
var onlinePlayers = bot.players;
    var bestPingPlayer;
    for (let [key, value] of Object.entries(onlinePlayers)) {
        if(value.ping > 0){
            if(bestPingPlayer == undefined){
                bestPingPlayer = value;
            }else{
                if(value.ping < bestPingPlayer.ping) bestPingPlayer = value;
            }
        }
    }
    say(`${bestPingPlayer.username} has the lowest ping at ${bestPingPlayer.ping}ms.`);
}

commands['worstping'] = commands['wp'] = function(){
    var onlinePlayers = bot.players;
    var bestPingPlayer;
    for (let [key, value] of Object.entries(onlinePlayers)) {
        if(bestPingPlayer == undefined){
            bestPingPlayer = value;
        }else{
            if(value.ping > bestPingPlayer.ping) bestPingPlayer = value;
        }
    }
    say(`${bestPingPlayer.username} has the highest ping at ${bestPingPlayer.ping}ms.`);
}

commands['averageping'] = commands['ap'] = function(){
    var onlinePlayers = bot.players;
    var pingSum = 0;
    var playerCount = 0;
    for (let [key, value] of Object.entries(onlinePlayers)) {
        if(value.ping > 0){
           pingSum += value.ping;
           playerCount++;
        }
    }
    say(`The average ping is ${Math.round(pingSum/playerCount)}ms.`);
}

commands['ping'] = commands['p'] = function(username, args){
    var player = args[0];
    if(player == undefined) player = username;
    if(username_filter.test(player) == false){
        say('Invalid username.');
        return;
    }
    if(bot.players[player] != undefined){
        if(bot.players[player].ping > 0){
            say(`${player}'s ping is ${bot.players[player].ping}ms.`);
        }else{
            say(`${player} hasn't been pinged by the server yet.`);
        }
    }else{
        say(`${player} is not online.`);
    }
}