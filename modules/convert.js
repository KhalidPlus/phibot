const convert = require('convert-units');


function convertFunc(username, args){
    var amount = args[0];
    var fromUnit = args[1];
    var toUnit = args[2];
    if(isNaN(amount) || toUnit == undefined){
        say('Usage: ?convert <amount> <from unit> <to unit>');
        return;
    }
    var result;
    var errored = false;
    try{
        result = convert(amount).from(fromUnit).to(toUnit);
    }catch(error){
        result = error.message;
        errored = true;
    }
    if(errored){
        say(result.toString());
    }else{
        say(result.toString() + ' ' + toUnit);
    }
}

module.exports = function(sayFunc){
    say = sayFunc;
    return convertFunc;
}
