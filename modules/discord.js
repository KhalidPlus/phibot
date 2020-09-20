// WIP
const fetch = require('node-fetch');


const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
var botdb;
async function discord(username, args){
    var player = args[0];
    if(player == undefined) player = username;
    if(username_filter.test(player) == false){
        say('Invalid username.');
        return;
    }
    request(`https://api.mojang.com/users/profiles/minecraft/${player}`, function (error, response, body){
        if (error) {
            say('There was an error requesting player data.');
            return;
        }
        if(body == undefined){
            say(`No player with username "${player}".`);
            return;
        }
        var playerdata = JSON.parse(body);
        botdb.serialize(function(){
            var stmt = botdb.prepare("SELECT discordtag FROM discord WHERE uuid=?;");
            stmt.get(playerdata.id, (err, row) => {
                if(err){
                    say("There was an error with the database.");
                    return;
                }
                console.log(row);
                if(row != undefined){
                    say(`Message ${playerdata.name} on Discord @${row.discordtag}`);
                }else{
                    say(`Player ${playerdata.name} hasn't set their Discord tag yet.`);
                }
            });
            stmt.finalize();
        });
    });
}

module.exports = function(sayFunc, botdbVar){
    say = sayFunc;
    botdb = botdbVar;
    return dadjoke;
}