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

    var song;

    if (process.argv[3]) {
        for (i = 3; i < process.argv.length; i++) {
        song = process.argv[i]
        }
    } else { 
        song = "I Want it That Way"
    }


    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {

        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var artists = data.tracks.items[0].artists
        for (j = 0; j < artists.length; j++) {
        console.log(JSON.stringify(artists[j].name, null, 2)); 
            }

        console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
      });
}

function movieThis() {
    console.log(process.argv[3])
}

function doThis() {
    console.log(process.argv[3])
}