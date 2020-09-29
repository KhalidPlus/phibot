var say;
function git(){
    say("PhiBot's GitHub repo: https://github.com/Zipdox/phibot");
}

module.exports = function(sayFunc){
    say = sayFunc;
    return git;
}
