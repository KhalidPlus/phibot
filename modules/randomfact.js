const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');


var greenText;
function randomFact(){
    fetch('http://randomfactgenerator.net/', {
        headers: { 'User-Agent': 'request' }
    }).then(response => response.text()).then(data => {
        const searchPage = new JSDOM(data);
        const fact = searchPage.window.document.getElementById('z').innerHTML.split('<br>')[0];
        greenText(fact);
    });
}

module.exports = function(greenTextFunc){
    greenText = greenTextFunc;
    return randomFact;
}
