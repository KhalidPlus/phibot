commands['fact'] = function(){
    var options = {
        url: `http://randomfactgenerator.net/`,
        headers: {
        'User-Agent': 'request'
        }
    };
    
    fetch('http://randomfactgenerator.net/').then(response => response.text()).then(data => {
        const searchPage = new JSDOM(data);
        const fact = searchPage.window.document.getElementById('z').innerText.split('\n')[0];
        greenText('fact');
    });
}
