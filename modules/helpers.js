const random = {
    int: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    float: function(min, max){
        return Math.random() * (max - min) + min;
    },
    pick: function(array){
        return array[Math.floor(Math.random() * Math.floor(array.length))];
    }
}

function greenText(text){
    say(`> ${text}`);
}

function whisper(user, text){
    bot.chat(`/w ${user} ${text}`);
}

function say(text){
    text = text.replace(/\n/g, ' ');
    if(text.length > 256){
        text = text.match(/.{1,256}/g)[0];
    }
    bot.chat(text);
}

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const username_filter = new RegExp("^[a-zA-Z0-9_]{1,16}$");
