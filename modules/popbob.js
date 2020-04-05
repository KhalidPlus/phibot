var popbobQuotes = fs.readFileSync('config/popbob.txt', 'utf8').trim().split('\n');

commands['popbob'] = function(){
    greenText(random.pick(popbobQuotes));
}
