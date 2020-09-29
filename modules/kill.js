var whisper;
function kill(username){
    whisper(username, "If you are feeling suicidal, or need someone to talk to, please call 1-800-273-8255 (in the US) or check out https://www.supportisp.org/ (international)");
}
module.exports = function(whisperFunc){
    whisper = whisperFunc;
    return kill;
}
