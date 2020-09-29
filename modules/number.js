const fetch = require('node-fetch');

var say;
async function number(username, args){
    var factNumber = args[0];
    if(factNumber == undefined || isNaN(factNumber) == true){
        say(`Syntax: ?number <number>`);
        return;
    }
    factNumber = Number(factNumber);
    if(Number.isInteger(factNumber) == false){
        say(`Syntax: ?number <integer>`);
        return;
    }
    factNumber = parseInt(factNumber);
    const fetchFact = await fetch(`http://numbersapi.com/${factNumber}`);
    const fact = await fetchFact.text();
    say(fact);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return number;
}
