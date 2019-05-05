// requirements and variables
require("dotenv").config();
const keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

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
            console.log("\n")
            console.log("Venue: " + concert.venue.name)
            console.log("Location: " + concert.venue.city + ", " + concert.venue.region)
            console.log("Date: " + moment(concert.datetime).format("MM/DD/YYYY"))
            console.log("\n")
        })
    })
}

function spotifyThis(input) {
    console.log(input)
    // if no user input, will search for this song
    if (!input) {
        input = "The Sign Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n")
        console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Song: " + data.tracks.items[0].name)
        console.log("Preview: " + data.tracks.items[3].preview_url)
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n")

    });
}

function movieThis() {
    console.log(input)
}

function doWhatItSays() {
    console.log(input)
}

console.log(query);
execute(query);