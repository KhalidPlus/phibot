const firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyBwR8xYsBYmm7mZQfyb8Z3SdPx4Nokm4gw",
    authDomain: "dad-joke-generator.firebaseapp.com",
    databaseURL: "https://dad-joke-generator.firebaseio.com",
    projectId: "dad-joke-generator",
    storageBucket: "dad-joke-generator.appspot.com"
});


function randomPick(array){
    return array[Math.floor(Math.random() * Math.floor(array.length))];
}
var dadJokeRunning = false;
var greenText;
function dadjoke(){
    if(dadJokeRunning == true) return;
    dadJokeRunning = true;
    const db = firebase.firestore();
    db.collection("Jokes").get().then(function(querySnapshot) {
        var AllJokes = querySnapshot.docs;
        var pickedJoke = randomPick(AllJokes).data();
        greenText(`Ｄａｄ： ${pickedJoke.setup}`);
        setTimeout(function(){
            greenText(`Ｄａｄ： ${pickedJoke.punchline}`);
            setTimeout(function(){
                dadJokeRunning = false;
            }, 2000);
        }, 2000);
    });
}

module.exports = function(greenTextFunc){
    greenText = greenTextFunc;
    return dadjoke;
}