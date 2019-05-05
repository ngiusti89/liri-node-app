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
function execute(query) {
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

function concertThis(input) {
    console.log(input);
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response) {
        
        response.data.forEach(concert => {
            console.log("Venue: " + concert.venue.name)
            console.log("Location: " +concert.venue.city + ", " + concert.venue.region)
            console.log("Date: " + moment(concert.datetime).format("MM/DD/YYYY"))
            console.log("\n")
        })
    })
}

function spotifyThis() {
    console.log(input)
}

function movieThis() {
    console.log(input)
}

function doWhatItSays() {
    console.log(input)
}

console.log(query);
execute(query);