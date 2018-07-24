

// ===============================================================================
// ROUTING
// ===============================================================================

// HTML GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases the user is shown an HTML page of content
// ---------------------------------------------------------------------------

var path = require("path");
var express = require("express");
var htmlrouter = express.Router();


htmlrouter.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

htmlrouter.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

htmlrouter.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

//Export HTML routes 
module.exports = htmlrouter;
