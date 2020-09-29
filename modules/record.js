var botdb;
function record(){
    botdb.get("SELECT * FROM '2b2t' ORDER BY messages DESC LIMIT 1;", (err, row) => {
        if(err){
            say('Shit, I think I fucked up my SQL database...');
            return;
        }
        say(`The record of most messages without mentioning 2b2t is ${row.messages} and was broken by ${row.username}.`);
    });
}

module.exports = function(sayFunc, botdbVar){
    say = sayFunc;
    botdb = botdbVar;
    return record;
}
