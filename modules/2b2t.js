var messagesWithoutMentioning2b = 0;
chatevents.push(function(username, message, translate, jsonMsg){
    if(message.toLowerCase().includes('2b2t')){
        if(messagesWithoutMentioning2b >= 50){
            say(`Congrats dumbass, we went ${messagesWithoutMentioning2b} messages without mentioning 2b2t.`);
            // btstream.write(`${username} ${messagesWithoutMentioning2b} ${message}\n`);
            botdb.serialize(function(){
                var stmt = botdb.prepare("INSERT INTO '2b2t' VALUES (?,?);");
                stmt.run(messagesWithoutMentioning2b, username);
                stmt.finalize();
            });
        }
        messagesWithoutMentioning2b = 0;
    }else{
        messagesWithoutMentioning2b++;
    }
});
