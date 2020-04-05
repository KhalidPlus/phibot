commands['playtime'] = commands['pt'] = function(username, args){
    // say('?playtime has been deprecated. Please use !playtime.');
    var player = args[0];
    if(player == undefined) player = username;
    if(username_filter.test(player) == false){
        say('Invalid username.');
        return;
    }
    var options = {
        url: `https://minecraftlist.com/players/${player}`,
        headers: {
        'User-Agent': 'request'
        }
    }
    request(options, function(error, response, body){
        var searchPage = new JSDOM(body);
        page = searchPage.window.document;
        var charts = page.getElementsByClassName('mv2');
        if(charts.length > 0){
            var oldfagChart;
            for(var element of charts){
                if(element.getElementsByClassName('blue')[0].innerHTML == 'oldfag.org'){
                    oldfagChart = element.getElementsByTagName('canvas')[0].id;
                }
            }
            if(oldfagChart != undefined){
                for(var element of page.getElementsByTagName('script')){
                    if(element.innerHTML.includes('Chart')){
                        var chartScript = element.innerHTML;
                    }
                }
                for(var scriptPiece of chartScript.split('new Chart')){
                    if(scriptPiece.includes(`'${oldfagChart}'`)){
                        startData = scriptPiece.indexOf('data: [');
                        endData = scriptPiece.indexOf(']') + 1;
                        var chartData = scriptPiece.slice(startData, endData).replace('data:', 'var playTimes =');
                        eval(chartData);
                        if(playTimes.length >= 99){
                            say(`${player} has 99+ hours of play time.`);
                        }else{
                            say(`${player} has ${playTimes.length} hours of play time.`);
                        }
                    }
                }
            }else{
                say(`${player} hasn't been seen or doesn't have much play time on OldFag.`);
            }
        }else{
            say(`No info on ${player}.`);
        }
    });
}