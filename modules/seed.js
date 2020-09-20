var say;
var isSeeding = false;
function seed(){
    if(isSeeding == true) return;
    isSeeding = true;
    say('You can drink my seed! ;P');
    setTimeout(function(){
        say('Just kidding, the seed is 7540332306713543803. Copy it here: https://pastebin.com/raw/x5ef7N18');
        isSeeding = false;
    }, 4000);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return seed;
}