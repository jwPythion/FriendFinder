// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");
var express = require("express");
var bodyParser = require("body-parser");
var apirouter = express.Router();

//json for current friends list
apirouter.get("/api/friends", function(req,res){
	res.json(friends);
})


//posting a new user and returning a match
apirouter.post("/api/friends", function(req, res){
	console.log("posting...");
	var newFriend = req.body;
	console.log(newFriend);
	

	//convert results into an arry of nums
	var newScore = function(array){
		var newScore = [];
		for (var i = 0; i < array.length; i++) {
			newScore.push(parseInt(array[i]));
		}
		return newScore;
	}
	//this function calculates difference of elements between two arrays and then sums up the difference
	var totalDiff = function(arrA, arrB){
		delta = 0;
		for(var i=0; i<arrA.length; i++){
			delta += Math.abs(arrA[i] - arrB[i]);
		}
		return delta;
	}
	//finiding difference of minimum index
	function indexingMin(array) {
    	if (array.length === 0) {
        	return -1;
    	}

    	var min = array[0];
    	var minIndex = 0;

    	for (var i = 1; i < array.length; i++) {
        	if (array[i] < min) {
            	minIndex = i;
            	min = array[i];
        	}
    	}

    	return minIndex;
	}

	var newFriendScore = newScore(newFriend['scores[]']);
	var currentFriendScores = []; 
	var differences = [];

	
	for(var i=0; i<friends.length;i++){
		currentFriendScores.push(newScore(friends[i]['scores[]']));
	}

	
	for (var i=0; i<currentFriendScores.length; i++){
		differences.push(totalDiff(newFriendScore, currentFriendScores[i]));
	}
	

	var minFriend = indexingMin(differences);
	var matchFriend = friends[minFriend];
	console.log("matching you now...");
	console.log(matchFriend);
	

	//push to a new array....	
	friends.push(newFriend);
	res.json(matchFriend);
})

//Export API routes for server.js to use.
module.exports = apirouter;