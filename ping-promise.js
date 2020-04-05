const ping = require('minecraft-protocol').ping;

module.exports = function(config){
    return new Promise(
        resolve => {
            ping(config, (err, result) => {
                if(err) resolve(err);
                resolve(result);
            });
        }
    );
};