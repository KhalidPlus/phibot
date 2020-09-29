var say;
function dox(){
    say('The dox you requested: https://pastebin.com/raw/wSEEjyH6');
}

module.exports = function(sayFunc){
    say = sayFunc;
    return dox;
}
