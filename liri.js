require("dotenv").config();
var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (command === "concert-this") {
    concertThis();
}else if (command === "spotify-this-song") {
    spotifyThis();
}else if (command === "movie-this") {
    movieThis();
}else if (command === "do-what-it-says") {
    doThis();
}else {
    console.log("I'm sorry, that is not a proper please try again")
};

function concertThis() {
    console.log(process.argv[3])
}

function spotifyThis() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.artists); 
      });
}

function movieThis() {
    console.log(process.argv[3])
}

function doThis() {
    console.log(process.argv[3])
}