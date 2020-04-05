commands['namemc'] = function(sender, args){
    var username = args[0]
    if(username == undefined){
        say('Please provide a username.');
        return;
    }
    if(username_filter.test(username) == false){
        say(`"${username}" is not a valid username.`);
        return;
    }
    request(`https://api.mojang.com/users/profiles/minecraft/${username}`, function (error, response, body) {
        if (error) {
            say('There was an error requesting player data.');
            return;
        }
        if(body.length == 0){
            say(`No player with username "${username}".`);
            return;
        }else{
            let playerid = JSON.parse(body)['id'];
            let playername = JSON.parse(body)['name'];
            request(`https://api.mojang.com/user/profiles/${playerid}/names`, function (error, response, body) {
                if (error) {
                    say(`There was an error requesting the history of "${playername}".`);
                    return;
                } else {
                    let history = JSON.parse(body);
                    let output = [];
                    history.forEach(element => {
                        if(element.changedToAt != undefined){
                            var changeDate = `${new Date(element.changedToAt).toDateString()}`.split(' ').slice(1,10).join(' ');
                            output.push(`${element.name} <${changeDate}>`);
                        }else{
                            output.push(element.name);
                        }
                    });
                    say(output.join(', '));
                }
            });
        }
    });
}