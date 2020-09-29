const calculate = require('mathjs').evaluate;


var isCalculating = false;
var say;
var whisper;
function calc(username, args){
    if(isCalculating) return;
    isCalculating = true;

    var expression = args.join(' ');
    if(expression.length < 2 || expression.length > 32){
        whisper(username, "Expression to short or to longer than the maximum 32 chars.");
        return;
    }
    var calculated;
    try{
        calculated = calculate(expression);
    }catch(err){
        calculated = `${err.name}: ${err.message}`;
    }
    say('≫ ' + String(calculated));
    setTimeout(function(){
        isCalculating = false;
    }, 10000);
}

module.exports = function(sayFunc, whisperFunc){
    say = sayFunc;
    whisper = whisperFunc;
    return calc;
}
