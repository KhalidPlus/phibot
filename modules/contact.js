var say;
function contact(){
    say("Add Zipdox, PhiBot's developer, on Discord: Zipdox#4503");
}

module.exports = function(sayFunc){
    say = sayFunc;
    return contact;
}
