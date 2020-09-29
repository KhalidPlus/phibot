function randomPick(array){
    return array[Math.floor(Math.random() * Math.floor(array.length))];
}
var say;
function ball(username, args){
    if(args.length < 3){
        say('The magic 8 ball needs a question to answer.');
        return;
    }
    say(`${username}: ${randomPick(["It is certain.","It is decidedly so.","Without a doubt.","Yes - definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."])}`);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return ball;
}
