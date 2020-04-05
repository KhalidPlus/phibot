var internetRules = fs.readFileSync('config/internetrules.txt', 'utf8').split('\n');

commands['rule'] = function(username, args){
    var ruleNumber = args[0];
    if(ruleNumber == undefined || isNaN(ruleNumber) == true){
        say(`Syntax: ?rule <number 1-47>`);
        return;
    }
    ruleNumber = Number(ruleNumber);
    if(Number.isInteger(ruleNumber) == false) return;
    ruleNumber = parseInt(ruleNumber);
    if(ruleNumber < 1 || ruleNumber > 47){
        say(`${ruleNumber} is not a rule.`);
        return;
    }
    greenText(internetRules[ruleNumber - 1]);
}
