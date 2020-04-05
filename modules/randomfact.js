commands['fact'] = function(){
    var options = {
        url: `http://randomfactgenerator.net/`,
        headers: {
        'User-Agent': 'request'
        }
    };
    request(options, function(error, response, body){
        var searchPage = new JSDOM(body);
        var fact = searchPage.window.document.getElementById('f').getElementsByTagName('div')[0].textContent.split('\n', 1)[0].trim().replace(/\\\"/g, `"`);
        greenText(fact);
//        console.log(fact);
    });
}
