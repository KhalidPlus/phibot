const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var botdb;
var msgIng = false;
function firstMsg(username, args){
    if(msgIng == true) return;
    msgIng = true;
    if(args[0] != undefined) username = args[0];
    if(username_filter.test(username) == false){
        say(`"${username}" is not a valid username.`);
        return;
    }
    botdb.get(`SELECT * FROM chat WHERE message LIKE '<${username}>%' ORDER BY time ASC LIMIT 1;`, (err, row) => {
        if(err){
            say('Shit, I think I fucked up my SQL database... plz no sql injection');
        }
        if(row != undefined){
            say(row.message.replace(/§a/g, '').replace(/§/g, ''));
        }else{
            say(`I don't have any saved messages from ${username}.`);
        }
        setTimeout(function(){
            msgIng = false;
        }, 2000);
    });
}

module.exports = function(sayFunc, botdbVar){
    say = sayFunc;
    botdb = botdbVar;
    return firstMsg;
}