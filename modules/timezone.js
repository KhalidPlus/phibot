commands['time'] = function timeZone(username, args){
    var location = args.join(' ');
    if(location == undefined){
        say('Usage: ?time <location>');
    }
    var timeZones = JSON.parse(fs.readFileSync('config/timezone.json', 'utf-8'));
    var foundLocation = timeZones.find(function(element) {
        if(element.toLowerCase().includes(location.replace(/ /, '_').toLowerCase())) return element;
    });

    if(foundLocation == undefined){
        say(`Couldn't time for location ${location}.`)
        return;
    }
    var options = {
        url: `http://worldtimeapi.org/api/timezone/${encodeURIComponent(foundLocation)}`,
        headers: {
        'User-Agent': 'request'
        }
    };
    request(options, function(error, response, body){
        var timeResults = JSON.parse(body);
        say(`Time for ${foundLocation}: ${timeResults.datetime.split('T')[1].split('.')[0]}`);
    });
}
