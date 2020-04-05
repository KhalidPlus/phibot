var jared2013Quotes = fs.readFileSync('config/jared2013.txt', 'utf8').trim().split('\n');

commands['jared2013'] = commands['jared'] = function(){
    greenText(random.pick(jared2013Quotes));
}
