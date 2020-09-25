const xtorrent = require('xtorrent');
const fetch = require('node-fetch');


function say(text){
    console.log(text);
}
async function torrent(username, args){
    const searchTerm = args.join(' ');
    if(searchTerm.length < 6 || searchTerm.length > 100){
        say('Please enter a search term between 6 and 100 characters.');
        return;
    }else{
        say(`Seaching 1337x for "${searchTerm}"...`);
    }
    // cxtorrent.search({query: 'neon genesis evangelion'}).then(data => {
        // const result = data[0];
        // say(`<${torrentTitle}> ${shortMagnet}`);
    // });
    const results = await xtorrent.search({query: searchTerm});
    if(results.torrents.length == 0) return say(`No results for ${searchTerm}`);
    console.log(results);
    const info = await xtorrent.info(results.domain + results.torrents[0].href);
    console.log(info);
    console.log(`http://mgnet.me/api/create?m=${encodeURIComponent(info.download.magnet)}&format=json`);
    // const shortenMagnet = await fetch(`http://mgnet.me/api/create?m=${encodeURIComponent(info.download.magnet)}&format=json`);
    fetch(`http://mgnet.me/api/create?m=${encodeURIComponent(info.download.magnet)}&format=json`, {
        redirect: 'follow',
        follow: 1000,
        compress: true,
        agent: null,
        insecureHTTPParser: true
    })
    .then(res => res.json())
    .then(json => console.log(json));
    // const shortMagnet = await shortenMagnetFetch.text();
    // console.log(shortMagnet);

}

torrent('', ['ready player one'])