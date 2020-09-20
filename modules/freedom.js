var fourFreedoms = [
    "[0] The freedom to run the program as you wish, for any purpose.",
    "[1] The freedom to study how the program works, and change it so it does your computing as you wish. Access to the source code is a precondition for this.",
    "[2] The freedom to redistribute copies so you can help others. ",
    "[3] The freedom to distribute copies of your modified versions to others. By doing this you can give the whole community a chance to benefit from your changes. Access to the source code is a precondition for this.",
]

var say;
function freedom(username, args){
    var freedomNumber = args[0];
    if(freedomNumber == undefined || isNaN(freedomNumber) == true){
        say(`Syntax: ?freedom <number 0-3>`);
        return;
    }
    freedomNumber = Number(freedomNumber);
    if(Number.isInteger(freedomNumber) == false){
        say(`Syntax: ?freedom <integer 0-3>`);
        return;
    }
    freedomNumber = parseInt(freedomNumber);
    if(freedomNumber < 0 || freedomNumber > 3){
        say(`${freedomNumber} is not a software freedom.`);
        return;
    }
    say(fourFreedoms[freedomNumber]);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return freedom;
}