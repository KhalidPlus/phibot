const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var playerList;
function bestping(){
    var onlinePlayers = playerList();
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

module.exports = function(sayFunc, playerListFunc){
    say = sayFunc;
    playerList = playerListFunc;
    return bestping;
}