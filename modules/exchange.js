const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');


var say;
async function exchange(username, args){
    var amount = args[0];
    var fromCurrency = args[1].toUpperCase();
    var toCurrency = args[2].toUpperCase();
    if(isNaN(amount) || toCurrency == undefined){
        say('Usage: ?exchange <amount> <from currency> <to currency>');
        return;
    }

    const getPage = await fetch(`https://fx-rate.net/calculator/?c_input=${fromCurrency}&cp_input=${toCurrency}&amount_from=${amount}`);
    const page = await getPage.text();

    var searchPage = new JSDOM(page);
    var resultPage =  searchPage.window.document;
    resultPage.getElementsByName('amount_to')[0].value;
    say(`Result: ${resultPage.getElementsByName('amount_from')[0].value} ${resultPage.getElementsByName('c_input')[0].value} = ${resultPage.getElementsByName('amount_to')[0].value} ${resultPage.getElementsByName('cp_input')[0].value}`);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return exchange;
}