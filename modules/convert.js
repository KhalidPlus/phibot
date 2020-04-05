commands['convert'] = function(username, args){
    var amount = args[0];
    var fromUnit = args[1];
    var toUnit = args[2];
    if(isNaN(amount) || toUnit == undefined){
        say('Usage: ?convert <amount> <from unit> <to unit>');
        return;
    }
    var result;
    try{
        result = convert(amount).from(fromUnit).to(toUnit);
    }catch(error){
        result = error.message;
    }
    say(result.toString());
}
