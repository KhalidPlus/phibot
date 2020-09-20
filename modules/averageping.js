const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var playerList;
function bestping(){
    var onlinePlayers = playerList();
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

module.exports = function(sayFunc, playerListFunc){
    say = sayFunc;
    playerList = playerListFunc;
    return bestping;
}