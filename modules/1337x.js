commands['1337x'] = async function(username, args){
    const searchTerm = args.join(' ');
    if(searchTerm.length < 6 || searchTerm.length > 100){
        say('Please enter a search term between 6 and 100 characters.');
        return;
    }else{
        say(`Seaching 1337x for "${searchTerm}"...`);
    }
    const searchResponse = await fetch(`https://1337x.to/search/${encodeURIComponent(searchTerm)}/1/`, {
        method: 'GET',
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
        redirect: 'follow'
    });
    const searchResponseText = await searchResponse.text();
    const searchPage = new JSDOM(searchResponseText).window.document;
    const resultsTable = searchPage.getElementsByClassName('table-list')[0];
    if(resultsTable == undefined){
        say(`No results for "${searchTerm}".`);
        return;
    }
    const firstResult = resultsTable.getElementsByClassName('coll-1')[1];
    if(firstResult == undefined){
        say(`No results for "${searchTerm}".`);
        return;
    }
    const resultLink = 'https://1337x.to' + firstResult.getElementsByTagName('a')[1].href;


    const itemResponse = await fetch(resultLink, {
        method: 'GET',
        headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
        redirect: 'follow'
    });
    const itemResponseText = await itemResponse.text();
    const itemPage = new JSDOM(itemResponseText).window.document;
    const torrentTitle = itemPage.getElementsByClassName('box-info-heading')[0].textContent.trim();
    let magnetLink;
    for(var link of itemPage.getElementsByTagName('a')){
        if(link.href.startsWith('magnet')){
            magnetLink = link.href;
            break;
        }
    }

    const shortMagnetResponse = await fetch('https://mgnet.xyz/go/sh/', {
        method: 'post',
        body: JSON.stringify({url_magnet: magnetLink})
    });
    const shortMagnet = 'https://mgnet.xyz/' + (await shortMagnetResponse.json()).i;

    say(`<${torrentTitle}> ${shortMagnet}`);
}

// commands['1337x'] = function(username, args){
//     var searchTerm = args.join(' ');
//     if(searchTerm.length < 6 || searchTerm.length > 100){
//         say('Please enter a search term between 6 and 100 characters.');
//         return;
//     }else{
//         say(`Seaching 1337x for "${searchTerm}"...`);
//     }
//     request({url: `https://1337x.to/search/${encodeURIComponent(searchTerm)}/1/`, headers: {'User-Agent': 'request'}}, function(error, response, body){
//         var searchPage = new JSDOM(body).window.document;
//         var resultsTable = searchPage.getElementsByClassName('table-list')[0];
//         if(resultsTable == undefined){
//             say(`No results for "${searchTerm}".`);
//             return;
//         }
//         var firstResult = resultsTable.getElementsByClassName('coll-1')[1];
//         if(firstResult == undefined){
//             say(`No results for "${searchTerm}".`);
//             return;
//         }
//         var resultLink = 'https://1337x.to' + firstResult.getElementsByTagName('a')[1].href;
//         var torrentTitle = firstResult.getElementsByTagName('a')[1].innerHTML;

//         request({url: resultLink, headers: {'User-Agent': 'request'}}, function(error, response, body){

//             var resultPage = new JSDOM(body).window.document;
//             var magnetLink;
//             for(var link of resultPage.getElementsByTagName('a')){
//                 if(link.href.startsWith('magnet')){
//                     magnetLink = link.href;
//                     break;
//                 }
//             }

//             var shortMagnet;
//             request(`http://mgnet.me/api/create?&format=json&opt=&m=${encodeURIComponent(magnetLink)}`, function (error, response, body) {
//                 shortMagnet = JSON.parse(body).shorturl;
//             }).on('complete', function(){
//                 say(`${torrentTitle}: ${shortMagnet}`);
//             });
//         });
//     });
// }
