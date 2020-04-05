// commands['thepiratebay'] = commands['tpb'] = function(username, args){
//     var searchTerm = args.join(' ');
//     if(searchTerm.length < 6 || searchTerm.length > 100){
//         say('Please enter a search term between 6 and 100 characters.');
//         return;
//     }else{
//         say(`Seaching for "${searchTerm}"...`);
//     }
//     var options = {
//         url: `https://pirateproxy.onl/search/${encodeURIComponent(searchTerm)}/0/99/0`,
//         headers: {
//         'User-Agent': 'request'
//         }
//     };
//     request(options, function(error, response, body){
//         var searchPage = new JSDOM(body);
//         var firstResult;
//         if(searchPage.window.document.getElementById('searchResult') == null){
//             firstResult = undefined;
//         }else{
//             firstResult = searchPage.window.document.getElementById('searchResult').getElementsByTagName('tr')[1].getElementsByTagName('td')[1];
//         }
//         if(firstResult == undefined){
//             say(`No results for "${searchTerm}".`);
//             return;
//         }else{
//             var title = firstResult.getElementsByClassName('detLink')[0].innerHTML;
//             var magnet = firstResult.querySelector('[title="Download this torrent using magnet"]').href;
//             var shortMagnet;
//             request(`http://mgnet.me/api/create?&format=json&opt=&m=${encodeURIComponent(magnet)}`, function (error, response, body) {
//                 var response = JSON.parse(body);
//                 shortMagnet = response.shorturl;

//             }).on('complete', function(){
//                 bot.chat(`${title}: ${shortMagnet}`);
//             });
//         }

//     });
// }
