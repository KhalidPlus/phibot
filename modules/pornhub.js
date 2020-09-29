const PornHub = require('pornhub.js')
const pornhub = new PornHub()


var pornhubbing = false;
var say;
async function ph(username, args){
    if(pornhubbing) return;
    pornhubbing = true;
    setTimeout(function(){
        pornhubbing = false;
    });

    var searchTerm = args.join(' ');
    if(searchTerm.toLowerCase().includes('child') || searchTerm.toLowerCase().includes('jailbait') || searchTerm.toLowerCase().includes('underage')){
        say(`Hi I'm Chris Hansen, who don't you have a seat right there ${username}.`);
        return;
    }
    if(searchTerm.toLowerCase().includes('2b2t')){
        say("Stop searching 2b2t you fucking faggot.");
        return;
    }
    if(searchTerm.length < 5 || searchTerm.length > 65){
        say('Please enter a search term of 5 to 64 letters.');
    }
    const searchResults = await pornhub.search('Video', searchTerm);
    const firstresult = searchResults.data[0];
    if(firstresult == undefined){
        say('No search results.');
        return;
    }
    say(`≫ ${firstresult.title} ${firstresult.url}`);
}

module.exports = function(sayFunc){
    say = sayFunc;
    return ph;
}
