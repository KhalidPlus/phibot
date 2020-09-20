// WIP
const fetch = require('node-fetch');


const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var botdb;
async function setdiscord(username, args){
    if(username_filter.test(username) == false){
        say('Invalid username.');
        return;
    }
    if(args.length == 0){
        say('Provide a Discord tag.');
        return;
    }
    var discordTag = args.join(' ');
    if(/^((.+?)#\d{4})$/.test(discordTag) == true && discordTag.indexOf('@') == -1 && discordTag.indexOf('#') == discordTag.length - 5){
        request(`https://api.mojang.com/users/profiles/minecraft/${username}`, function (error, response, body){
            if (error) {
                say('There was an error requesting player data.');
                return;
            }
            if(body.length == 0){
                say(`No player with username "${username}".`);
                return;
            }
            var playerdata = JSON.parse(body);
            botdb.serialize(function(){
                var delstmt = botdb.prepare("DELETE FROM discord WHERE uuid=?;");
                delstmt.run(playerdata.id);
                delstmt.finalize();
                var instmt = botdb.prepare("INSERT INTO discord VALUES (?,?);");
                instmt.run(playerdata.id, discordTag, function(){
                    bot.chat(`Your Discord tag is set to ${discordTag}`);
                });
                instmt.finalize();
            });
        });
    }else{
        say('Invalid Discord tag.');
        return;
    }
}

module.exports = function(sayFunc, botdbVar){
    say = sayFunc;
    botdb = botdbVar;
    return dadjoke;
}