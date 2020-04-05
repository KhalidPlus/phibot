commands['discord'] = function(username, args){
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

commands['setdiscord'] = function(username, args){
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
