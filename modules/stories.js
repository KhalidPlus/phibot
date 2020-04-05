const stories = JSON.parse(fs.readFileSync('config/stories.json'));

commands['stories'] = function(){
    var storyArray = [];
    for(var storyName in stories) storyArray.push(storyName);
    say(`Stories: ${storyArray.join(', ')}`);
}

var storyTelling = false;

commands['story'] = function(username, args){
    var storyPick = args.join(' ');
    if(storyTelling != false) return;
    if(stories[storyPick] == undefined){
        say("That story doesn't exist, make sure to use proper capitalization.");
        return;
    }
    storyTelling = username;

    function nextLine(i, pickedStory){
        if(i == pickedStory.length || storyTelling == undefined){
            storyTelling = false;
            return;
        }
        say(pickedStory[i]);
        setTimeout(() => {
            nextLine(i+1, pickedStory);
        }, 30 * (Math.sqrt(pickedStory[i].length * 20) + (2 * pickedStory[i].length)) + 200);
    }
    nextLine(0, stories[storyPick]);
}

commands['endstory'] = function(username){
    if(storyTelling == false){
        say("I'm not telling a story right now.");
        return;
    }
    if(username == storyTelling|| admins[bot.players[username].uuid] != undefined){
        storyTelling = undefined;
        say("Stopped telling the story.");
    }else{
        say("You're not allowed to end this story.");
    }
}

