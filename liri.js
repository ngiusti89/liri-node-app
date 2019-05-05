// requirements and variables
require("dotenv").config();
const keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// var spotify = new Spotify(keys.spotify);

var query = process.argv[2];
var input = process.argv.slice(3).join(" ");


// function telling app which function to run based on user input
function execute (query) {
    if (query === "concert-this") {
        concertThis(input);
      }
      if (query === "spotify-this-song") {
        spotifyThis(input);
      }
      if (query === "movie-this") {
        movieThis(input);
      }
      if (query === "do-what-it-says") {
        doWhatItSays();
      }
}

function concertThis (input) {
    console.log(input);
}

function spotifyThis () {
    console.log(input)
}

function movieThis () {
    console.log(input)
}

function doWhatItSays () {
    console.log(input)
}

console.log(query);
execute(query);