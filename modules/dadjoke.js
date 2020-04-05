var app = firebase.initializeApp({
    apiKey: "AIzaSyBwR8xYsBYmm7mZQfyb8Z3SdPx4Nokm4gw",
    authDomain: "dad-joke-generator.firebaseapp.com",
    databaseURL: "https://dad-joke-generator.firebaseio.com",
    projectId: "dad-joke-generator",
    storageBucket: "dad-joke-generator.appspot.com"
});

var dadJokeRunning = false;
commands['dadjoke'] = function(){
    if(dadJokeRunning == true) return;
    dadJokeRunning = true;
    var db = firebase.firestore();
    db.collection("Jokes").get().then(function(querySnapshot) {
        var AllJokes = querySnapshot.docs;
        var pickedJoke = random.pick(AllJokes).data();
        greenText(`Ｄａｄ： ${pickedJoke.setup}`);
        setTimeout(function(){
            greenText(`Ｄａｄ： ${pickedJoke.punchline}`);
            setTimeout(function(){
                dadJokeRunning = false;
                console.log(dadJokeRunning);
            }, 2000);
        }, 2000);
    });
}
