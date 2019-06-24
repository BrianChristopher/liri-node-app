//This links the .env and creates variables to use for the secret information
require("dotenv").config();
const keys = require("./keys.js")
const spotifyID = keys.spotify.id;
const spotifySecret = keys.spotify.secret;
const bitSecret = keys.bandsintown.secret;

//Other required nodes
const fs = require("fs");
const axios = require('axios');
const moment = require('moment');

//THESE ARE THE GLOBAL VARIABLES AND PROCESS WHICH TAKE IN USER INPUT FROM THE TERMINAL
var command = process.argv[2];
var input = process.argv.slice(3).join("+");
var displayName = process.argv.slice(3).join(" ");

// for (i = 3; i < process.argv.length; i++) {
//     if (i == 3) {
//         input += process.argv[i];
//     }
//     else {
//         input += "+" + process.argv[i];
//     }
// }
// var displayName = "";
// for (i = 3; i < process.argv.length; i++) {
//     if (i == 3) {
//         displayName += process.argv[i];
//     }
//     else {
//         displayName += " " + process.argv[i];
//     }
// }

//THESE ARE THE FUNCTIONS TO RUN EACH COMMAND
var concertThis = function () {
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bitSecret + "&date=upcoming";
    //console.log(queryURL);
    console.log("\n");
    console.log(displayName + " will be performing at the following venue(s): \n")
    axios.get(queryURL).then(
        function (response) {
            var concertInformation = response.data;
            for (i = 0; i < concertInformation.length; i++) {
                console.log("Venue: " + concertInformation[i].venue.name + ", " + concertInformation[i].venue.city + ", " + concertInformation[i].venue.region);
                console.log("Date: " + moment(concertInformation[i].datetime).format('MM/DD/YYYY'))
                console.log("---------------")
            }
        })
};

var spotifyThisSong = function () {
    console.log("You called spotify-this for: " + input);
};

var movieThis = function () {
    console.log("You called movie-this for: " + input)
};
var doWhatItSays = function () {
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
        console.log("Sorry, that is not an allowed function. Please enter concert-this, spotify-this-song, movie-this, or do-what-it-says. You may add a band, song, or movie after 'this'.");
        break;
}
