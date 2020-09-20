const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');


var say;
function randomPick(array){
    return array[Math.floor(Math.random() * Math.floor(array.length))];
}
async function quote(username, args){
    const searchTerm = args.join(' ');
    if(searchTerm.length < 6 || searchTerm.length > 100){
        say('Please enter a name between 6 and 100 characters.');
        return;
    }
    const searchResponse = await fetch(`https://www.brainyquote.com/api/suggest?m=0&langc=en&query=${encodeURIComponent(searchTerm)}`);
    const searchResponseJSON = await searchResponse.json();
    let quotesURL;
    for(let suggestion of searchResponseJSON.suggestions){
        if(suggestion.data.url.startsWith('/authors/')){
            quotesURL = 'https://www.brainyquote.com' + suggestion.data.url;
            break;
        }
    }
    if(quotesURL == undefined){
        say(`No search results for "${searchTerm}".`);
        return;
    }
    const resultsResponse = await fetch(quotesURL);
    const resultsResponseText = await resultsResponse.text();
    const resultsPage = new JSDOM(resultsResponseText).window.document;
    const resultsQuotes = resultsPage.getElementsByClassName('grid-item boxy');
    const pickedQuote = randomPick(resultsQuotes);
    
    const quoteText = pickedQuote.getElementsByClassName('oncl_q')[0].textContent;
    const quoteName = pickedQuote.getElementsByClassName('oncl_a')[0].textContent;
    say(`❝${quoteText}❞ ～${quoteName}`);   
}

module.exports = function(sayFunc){
    say = sayFunc;
    return quote;
}