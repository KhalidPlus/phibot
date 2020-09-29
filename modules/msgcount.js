var say;
var botdb;
var msgIng = false;
function msgCount(){
    if(msgIng == true) return;
    msgIng = true;
    botdb.get("SELECT Count(*) FROM chat;", (err, row) => {
        if(err){
            say('Shit, I think I fucked up my SQL database... plz no sql injection');
        }
        if(row != undefined){
            say(`I've recorded ${row['Count(*)']} chat messages so far.`);
        }else{
            say("Ah shit, something went wrong.");
        }
        setTimeout(function(){
            msgIng = false;
        }, 2000);
    });
}

module.exports = function(sayFunc, botdbVar){
    say = sayFunc;
    botdb = botdbVar;
    return msgCount;
}
