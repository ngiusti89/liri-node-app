// requirements and variables
require("dotenv").config();
const keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// command line inputs
var query = process.argv[2];
var input = process.argv.slice(3).join(" ");

// function telling app which function to run based on user input
function execute(query) {
    if (query === "concert-this") {
        concertThis(input);
    }
    if (query === "spotify-this-song") {
        spotifyThisSong(input);
    }
    if (query === "movie-this") {
        movieThis(input);
    }
    if (query === "do-what-it-says") {
        doWhatItSays();
    }
}

// concert search
function concertThis(input) {
    console.log(input);
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response) {
        response.data.forEach(concert => {
            console.log("\n")
            console.log("Venue: " + concert.venue.name)
            console.log("Location: " + concert.venue.city + ", " + concert.venue.region)
            console.log("Date: " + moment(concert.datetime).format("MM/DD/YYYY"))
        })
    })
}

// spotify search
function spotifyThisSong(input) {
    console.log(input)
    // if no user input, will search for The Sign by Ace of Base
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

// movie search
function movieThis() {
    console.log(input)
    // if no user input, search for Mr. Nobody
    if (!input) {
        input = "Mr Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(function (response) {
        console.log("\n")
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating); // also found at response.data.Ratings[0].Value (displayed /10)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("\n")
    })
}

function doWhatItSays() {
    console.log(input)
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");
        input = dataArray[1];
        spotifyThisSong(input)
    })
}

console.log(query);
execute(query);