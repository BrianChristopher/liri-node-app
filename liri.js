

// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var fs = require("fs");




//THESE ARE THE GLOBAL VARIABLES WHICH TAKE IN USER INPUT FROM THE TERMINAL
var command = process.argv[2];
var input = process.argv[3];

//THESE ARE THE FUNCTIONS TO RUN EACH COMMAND
var concertThis = function(){
    console.log("You called concert-this for: " + input);
};

var spotifyThisSong = function(){
    console.log("You called spotify-this for: " + input);
};

var movieThis = function(){
    console.log("You called movie-this for: " + input)
};
var doWhatItSays = function(){
    console.log("You called concert this for: " + input);
};

//THIS IS THE SWITCH CASE TO CALL THE APPROPTIATE FUNCTION
switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Sorry, that is not an allowed function. Please enter concert-this, spotify-this-song, movie-this, do-what-it-says. You may add a band, song, or movie after 'this'.");
        break;
}
