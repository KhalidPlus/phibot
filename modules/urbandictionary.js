var udTimeout = 0;
var udInterval;

commands['urbandictionary'] = commands['ud'] = function(username, args){
    if(udTimeout > 0){
        whisper(username, `Due to excessive use, you'll have to wait ${udTimeout} seconds to search Urban Dictionary.`);
        return;
    }else{
        udTimeout = 20;
        udInterval = setInterval(function(){
            udTimeout--;
            if(udTimeout <= 0) clearInterval(udInterval);
        }, 1000);
    }

    var searchTerm = args.join(' ');
    if(searchTerm == undefined){
        say('Please enter a search term.');
        return;
    }
    if(searchTerm.length < 3 || searchTerm.length > 50){
        say('Please enter a search term of 3-50 characters.');
        return;
    }
    var options = {
        url: `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(searchTerm)}`,
        headers: {
        'User-Agent': 'request'
        }
    };
    var definition;
    request(options, function(error, response, body){
        var searchPage = new JSDOM(body);
        var results = searchPage.window.document.getElementById('content');
        if(results == null || results == undefined){
            definition = `No Urban Dictionary Results for "${searchTerm}".`;
            return;
        }else{
            var firstResult = results.getElementsByClassName('def-panel')[0];
            if(firstResult == undefined){
                definition = `No Urban Dictionary Results for "${searchTerm}".`;
                return;
            }
            var word = firstResult.getElementsByClassName('word')[0].textContent;
            var meaning = firstResult.getElementsByClassName('meaning')[0].textContent.replace(/\n/, ' ');
            definition = `${word} ≫ ${meaning}`;
        }
    }).on('complete', function(){
        say(definition);
    });
}
