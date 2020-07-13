commands['fact'] = function(){
    fetch('http://randomfactgenerator.net/', {
        headers: { 'User-Agent': 'request' }
    }).then(response => response.text()).then(data => {
        const searchPage = new JSDOM(data);
        const fact = searchPage.window.document.getElementById('z').innerHTML.split('<br>')[0];
        greenText('fact');
    });
}
