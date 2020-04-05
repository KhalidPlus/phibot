commands['exchange'] = function(username, args){
    var amount = args[0];
    var fromCurrency = args[1].toUpperCase();
    var toCurrency = args[2].toUpperCase();
    if(isNaN(amount) || toCurrency == undefined){
        say('Usage: ?exchange <amount> <from currency> <to currency>');
        return;
    }

    var options = {
        url: `https://fx-rate.net/calculator/?c_input=${fromCurrency}&cp_input=${toCurrency}&amount_from=${amount}`,
        headers: {
        'User-Agent': 'request'
        }
    };

    request(options, function(error, response, body){
        var searchPage = new JSDOM(body);
        var resultPage =  searchPage.window.document;
        resultPage.getElementsByName('amount_to')[0].value;
        say(`Result: ${resultPage.getElementsByName('amount_from')[0].value} ${resultPage.getElementsByName('c_input')[0].value} = ${resultPage.getElementsByName('amount_to')[0].value} ${resultPage.getElementsByName('cp_input')[0].value}`);
    });
}
