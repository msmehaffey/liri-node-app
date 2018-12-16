require("dotenv").config();
var moment = require("moment")
var keys = require("./keys.js")
var request = require('request');
var fs = require('fs');


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
    var artist = [];

    for (j = 3; j < process.argv.length; j++) {
        artist.push(process.argv[j])
    }
    artist = artist.join("");

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

            request(queryURL, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    var info = JSON.parse(body);

                    for (var i = 0; i < info.length; i++) {

                        console.log("Venue: " + info[i].venue.name);
                        console.log("Location: " + info[i].venue.city + ", " + info[i].venue.country);
                        
                        var date = info[i].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        console.log("----------------")
                        };
                    }
            });
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
        var aList = [] 
        for (j = 0; j < artists.length; j++) {
        aList.push(JSON.stringify(artists[j].name, null, 2)); 
            }
        aPrint = aList.join(", ");
        console.log("Artist(s): " + aPrint);
        console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
      });
}

function movieThis() {
    var movieTitle = [];

    if (process.argv[3]) {
        for (i = 3; i < process.argv.length; i++) {
            movieTitle.push(process.argv[i])
        }
    }else {
        movieTitle = "Mr.nobody"
    }

    request('http://www.omdbapi.com/?t=' + movieTitle + '&type=movie&apikey=ad69a25e', function (err, response) {

        if (err) {
            return console.log('Error occurred: ' + err);
          }
        
        var movieObject = JSON.parse(response.body);
        
        console.log("Title: " + movieObject.Title);
        console.log("Year of Release: " + movieObject.Year);
        console.log("IMDb Rating: " + movieObject.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieObject.Ratings[1].Value);
        console.log("Country: " + movieObject.Country);
        console.log("Language: " + movieObject.Language);
        console.log("Plot: " + movieObject.Plot);
        console.log("Cast: " + movieObject.Actors);

    });
}

function doThis() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        // data = data.split(" , ")
        // data = data.map(x => x.trim())
        command = data.substring(0, data.indexOf(','))
        song = data.substring(data.indexOf(','))
        song = song.substring(1)

        
        spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {

            if (err) {
              return console.log('Error occurred: ' + err);
            }
    
            var artists = data.tracks.items[0].artists
            var aList = [] 
            for (j = 0; j < artists.length; j++) {
            aList.push(JSON.stringify(artists[j].name, null, 2)); 
                }
            aPrint = aList.join(", ");
            console.log("Artist(s): " + aPrint);
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
          });

})
}


