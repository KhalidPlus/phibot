var helpCommands = JSON.parse(fs.readFileSync('config/help.json', 'utf8'));

commands['help'] = commands['h'] = function(username, args){
    if(args[0] == undefined){
        whisper(username, helpCommands["help"]);
    }else{
        if(helpCommands[args[0]] == undefined){
            whisper(username, `"?${args[0]}" is not a command.`);
        }else{
            whisper(username, helpCommands[args[0]]);
        }
    }
}
