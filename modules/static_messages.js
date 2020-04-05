commands['contact'] = function(){
    greenText('Add Zipdox on Discord: Zipdox#8934');
}

commands['git'] = commands['github'] = function(){
    greenText("PhiBot's GitHub repo: https://github.com/Zipdox/phibot");
}

// commands['kill'] = function(){
//     greenText("Hahaha! I'm immortal you silly! 😂");
// }

commands['cuboyd'] = function(){
    greenText("CuBoyd is gay, no doubt about it.");
}

commands['kill'] = commands['suicide'] = function(username){
    whisper(username, "If you are feeling suicidal, or need someone to talk to, please call 1-800-273-8255 (in the US) or check out https://www.supportisp.org/ (international)");
}

var isSeeding = false;
commands['seed'] = function(){
    if(isSeeding == true) return;
    isSeeding = true;
    say('You can drink my seed! ;P');
    setTimeout(function(){
        say('Just kidding, the seed is 7540332306713543803. Copy it here: https://pastebin.com/raw/x5ef7N18');
        isSeeding = false;
    }, 4000);
}

commands['dox'] = function(){
    say('The dox you requested: https://pastebin.com/raw/wSEEjyH6');
};
