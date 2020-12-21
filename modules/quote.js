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
    const response = await fetch(`https://www.azquotes.com/search_results.html?query=${encodeURIComponent(searchTerm)}`);
    const responseHTML = await response.text();
    const resultsPage = new JSDOM(responseHTML).window.document;
    const quoteBlocks = resultsPage.getElementsByClassName('wrap-block');
    if(quoteBlocks.length < 1) return say("Couldn't find any quotes, did you spell the name correctly? Is the person famous enough to have quotes?");
    const pickedQuote = randomPick(quoteBlocks);
    const quoteTitles = pickedQuote.getElementsByClassName('title');
    if(quoteTitles.length != 1) return say("Error extracting quote text.");
    const quoteText  = quoteTitles[0].textContent.trim();
    const quoteAuthors = pickedQuote.getElementsByClassName('author');
    if(quoteAuthors.length != 1) return say("Error extracting quote author.");
    const quoteAuthor = quoteAuthors[0].textContent.trim();
    say(`❝${quoteText}❞ ～${quoteAuthor}`); 
}

module.exports = function(sayFunc){
    say = sayFunc;
    return quote;
}
