# liri-node-app


LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a *_Language_* Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

# NPM Packages Needed (Dependencies):

* bandsintown 
* dotenv 
* fs 
* moment 
* node-spotify-api 
* request.



# Video Walk through demonstration for how to use. 
https://drive.google.com/file/d/1IhjTl6fhBZP59M_tMtKyCj8SiLuxTmc0/view?usp=sharing

# Get Started
These are the essential functions of the applications. 

# Concert Information
RRetrieves future concert information based on the artist you input

node liri concert-this artistName

# Song Information
Retrieves song information for a track:

node liri.js spotify-this-song songName

# Movie Information
Retrieves movie information for a movie:

node liri.js movie-this movieName

# Random Command
Pulls a random textline from a text file that will perform one of the previous three commands

node liri.js do-what-it-says
