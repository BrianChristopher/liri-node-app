//This links the .env and creates variables to use for the secret information
require("dotenv").config();
const keys = require("./keys.js")
const spotifyID = keys.spotify.id;
const spotifySecret = keys.spotify.secret;
const bitSecret = keys.bandsintown.secret;
const Spotify = require('node-spotify-api');

const spotify = new Spotify({
    id: spotifyID,
    secret: spotifySecret
});

//Other required nodes
const fs = require("fs");
const axios = require('axios');
const moment = require('moment');

//THESE ARE THE GLOBAL VARIABLES AND PROCESS WHICH TAKE IN USER INPUT FROM THE TERMINAL
var command = process.argv[2];
var inputWithPlus = process.argv.slice(3).join("+");
var inputWithSpace = process.argv.slice(3).join(" ");

//THESE ARE THE FUNCTIONS TO RUN EACH COMMAND
var concertThis = function () {
    var queryURL = "https://rest.bandsintown.com/artists/" + inputWithPlus + "/events?app_id=" + bitSecret + "&date=upcoming";
    //console.log(queryURL);
    console.log("\n");
    console.log(inputWithSpace + " will be performing at the following venue(s): \n")
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
    spotify
        .search({ type: 'track', query: inputWithSpace })
        .then(function (response) {
            var trackTitle = response.tracks.items[0].name;
            var searchArtist = response.tracks.items[0].artists[0].name;
            var searchAlbum = response.tracks.items[0].album.name;
            var searchPreview = response.tracks.items[0].external_urls.spotify;
            console.log("\n");
            console.log("You searched for the song: " + inputWithSpace);
            console.log("---------------");
            console.log("Track Title: " + trackTitle);
            console.log("Artist(s): " + searchArtist);
            console.log("Album: " + searchAlbum);
            console.log("Preview Link: " + searchPreview);
            console.log("---------------");

        })
        .catch(function (err) {
            console.log(err);
        });
};

var movieThis = function () {
    console.log("You called movie-this for: " + inputWithPlus)
    var queryURL = "https://www.omdbapi.com/?t=" + inputWithPlus + "&apikey=trilogy";
    //console.log(queryURL);
    console.log("\n");
    console.log("You searched for: " + inputWithSpace);
    axios.get(queryURL).then(
        function (response) {
            console.log(response.data);
            var movieTitle = 1;
            var movieYear = 2;
            var movieIMBDRating = 3;
            var movieRTRating = 4;
            var movieCountry = 5;
            var movieLanguage = 6;
            var moviePlot = 7;
            var movieActors = 8;
            console.log("Movie Title: " + movieTitle);
            console.log("Year Released: " + movieYear);
            console.log("IMBD Rating: " + movieIMBDRating);
            console.log("Rotten Tomato Rating: " + movieRTRating);
            console.log("Country of Orgin: " + movieCountry);
            console.log("Language: " + movieLanguage);
            console.log("Plot: " + moviePlot);
            console.log("Actor(s): " + movieActors);
        })


};
var doWhatItSays = function () {
    console.log("You called do what it says.");
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


