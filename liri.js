// requirements and variables
require("dotenv").config();
const keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var query = process.argv[2];
var input = process.argv.slice(3).join(" ");

function concertThis () {

}

function spotifyThis () {

}

function movieThis () {

}

function doWhatItSays () {
    
}