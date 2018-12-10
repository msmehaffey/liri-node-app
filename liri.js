require("dotenv").config();
var keys = require("./keys.js")
var request = require('request');

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

    var song = [];

    if (process.argv[3]) {
        for (i = 3; i < process.argv.length; i++) {
        song.push(process.argv[i])
        }
    } else { 
        song = "The Sign Ace of Base"
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
    var movieTitle = [];

    for (i = 3; i < process.argv.length; i++) {
        movieTitle.push(process.argv[i])
    }

    request('http://www.omdbapi.com/?t=' + movieTitle + '&type=movie&apikey=ad69a25e', function (err, response) {

        console.log(movieTitle)
        if (err) {
            return console.log('Error occurred: ' + err);
          }
        
        var movieObject = JSON.parse(response.body);
        console.log(movieObject.Title);
        console.log(movieObject.Year);
        console.log(movieObject.imdbRating);
        console.log(movieObject.Ratings[1].Value);
        console.log(movieObject.Country);
        console.log(movieObject.Language);
        console.log(movieObject.Plot);
        console.log(movieObject.Actors);

    });
}

function doThis() {
    console.log(process.argv[3])
}