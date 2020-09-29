const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");


const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
var say;
async function namemc(sender, args){
    var username = args[0]
    if(username == undefined){
        say('Please provide a username.');
        return;
    }
    if(username_filter.test(username) == false){
        say(`"${username}" is not a valid username.`);
        return;
    }
    const usernameRequest = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    const usernameResult = await usernameRequest.json().catch(error => {
        say(`No player with username "${username}".`);
    });
    if(usernameResult == undefined) return;
    const requestHistory = await fetch(`https://api.mojang.com/user/profiles/${usernameResult.id}/names`);
    const history = await requestHistory.json();
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

module.exports = function(sayFunc){
    say = sayFunc;
    return namemc;
}
