var pornhubTimeout = 0;
var pornhubInterval;

commands['pornhub'] = commands['ph'] = function(username, args){
    if(pornhubTimeout > 0){
        // whisper(username, `Due to excessive use, you'll have to wait ${pornhubTimeout} seconds to search PornHub.`);
        return;
    }else{
        pornhubTimeout = 30;
        pornhubInterval = setInterval(function(){
            pornhubTimeout--;
            if(pornhubTimeout <= 0) clearInterval(pornhubInterval);
        }, 1000);
    }

    var searchTerm = args.join(' ');
    if(searchTerm.toLowerCase().includes('child') || searchTerm.toLowerCase().includes('jailbait') || searchTerm.toLowerCase().includes('underage')){
        say(`Hi I'm Chris Hansen, who don't you have a seat right there ${username}.`);
        return;
    }
    if(searchTerm.toLowerCase().includes('2b2t')){
        say("Stop searching 2b2t you fucking faggot.");
        return;
    }
    if(searchTerm.length >= 3 && searchTerm.length <= 50){
        var options = {
            url: `https://www.pornhub.com/video/search?search=${encodeURIComponent(searchTerm)}&correction=false`,
            headers: {
            'User-Agent': 'request'
            }
        };
        var link;
        var title;
        var noResults = false;
        request(options, function(error, response, body){
            var searchPage = new JSDOM(body);
            var firstresult;

            try{
                firstresult = searchPage.window.document.getElementById('videoSearchResult').getElementsByClassName('videoblock')[0];
            }catch(err){}

            if(firstresult != undefined){
                link = `https://www.pornhub.com${firstresult.getElementsByClassName('title')[0].getElementsByTagName('a')[0].href}`;
                title = firstresult.getElementsByClassName('title')[0].getElementsByTagName('a')[0].textContent;
            }else{
                noResults = true;
            }
        }).on('complete', function(){
            if(link != undefined){
                say(`${title} ${link}`);
            }else if(noResults == true){
                say(`Couldn't find any results for "${searchTerm}".`);
            }else{
                say('There was an error searching PornHub.');
            }
        });

    }else{
        if(searchTerm.length < 3){
            say('Please enter a longer search term.');
        }else if(searchTerm.length > 64){
            say('Please enter a shorter search term.');
        }
    }
}
