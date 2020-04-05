var minecraftFacts = fs.readFileSync('config/mcfacts.txt', 'utf8').trim().split('\n');

commands['mcfact'] = function(){
    greenText(random.pick(minecraftFacts));
}
