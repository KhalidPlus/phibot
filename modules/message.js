var msgIng = false;

commands['firstmsg'] = commands['firstmessage'] = commands['firstwords'] = function(username, args){
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

commands['lastmsg'] = commands['lastmessage'] = commands['lastwords'] = function(username, args){
    if(msgIng == true) return;
    msgIng = true;
    if(args[0] != undefined) username = args[0];
    if(username_filter.test(username) == false){
        say(`"${username}" is not a valid username.`);
        return;
    }
    botdb.get(`SELECT * FROM chat WHERE message LIKE '<${username}>%' ORDER BY time DESC LIMIT 1;`, (err, row) => {
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

var quoting = false;

commands['randommsg'] = function(username, args){
    if(quoting == true){
        whisper(username, "Due to SQL performance issues this command has a one minute timeout.");
        return;
    }
    quoting = true;

    if(args[0] != undefined) username = args[0];
    if(username_filter.test(username) == false){
        say(`"${username}" is not a valid username.`);
        return;
    }
    botdb.get(`SELECT * FROM chat WHERE message LIKE '<${username}>%' ORDER BY random() LIMIT 1;`, (err, row) => {
        if(err){
            say('Shit, I think I fucked up my SQL database... plz no sql injection');
        }
        if(row != undefined){
            say(row.message.replace(/§a/g, '').replace(/§/g, ''));
        }else{
            say(`I don't have any saved messages from ${username}.`);
        }
        setTimeout(function(){
            quoting = false;
        }, 60000);
    });
}

commands['msgcount'] = commands['messagecount'] = function(){
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
