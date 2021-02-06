const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');


var say;
async function ud(username, args){
    const searchTerm = args.join(' ');
    if(searchTerm.length < 3 || searchTerm.length > 64){
        say('Please enter a term between 3 and 64 characters.');
        return;
    }
    const searchResponse = await fetch(`https://www.urbandictionary.com/define.php?term=${encodeURIComponent(searchTerm)}`);
    const searchResponseHTML = await searchResponse.text();
    const searchPage = new JSDOM(searchResponseHTML);
    const results = searchPage.window.document.getElementsByClassName('def-panel');
    if(results.length == 0){
        say('No search results,');
        return;
    }
    const firstResult = results[0];
    const title = firstResult.getElementsByClassName('word')[0].textContent;
    const meaning = firstResult.getElementsByClassName('meaning')[0].textContent;
    say(`≫ ${title} ≫ ${meaning}`);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return ud;
}
