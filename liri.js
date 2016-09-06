//For the other js file I'm referencing


// Takes in all of the command line arguments
var inputString = process.argv;

// fs.readFile("keys.js", 'utf8', function(error, data) {
// 	var keysOutput = data.split("");
// });
//----------------------------------------------------------------
// runs when My Tweets is
var myTweets = function() {
	var Twitter = require('twitter');
	var keys = require('./keys.js');
	var params = {dpfpgaming: 'nodejs'};
	var userkey = keys.twitterKeys
	var client = new Twitter(userkey)
	console.log(userkey)
	client.get('statuses/user_timeline', {screen_name: 'dpfpgaming'}, function(error, tweets, response){
		if (error) {
			console.log('Error occured: ' + error);
			return;
		};
		nicetweets = JSON.stringify(tweets, null, 2);

		for(i = 0; i < 20; i++){
			console.log(tweets[i].text);
			console.log("----------------------------");
		}
	});
}; 
var movieThis = function() {
	inquire.prompt([
    {
      type: "input",
      message: "What movie would you like to choose?",
      name: "movieChoice"
      }
      ]).then(function (movies) {
      var queryUrl = 'http://www.omdbapi.com/?t=' + movies.movieChoice +'&y=&plot=short&tomatoes=true&r=json'; 
      console.log("The user typed: " + queryUrl);

      var request = require('request');
      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)["Title"]);
        console.log("Release year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Countries of production: " + JSON.parse(body)["Country"]);
        console.log("Available languages: " + JSON.parse(body)["Language"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
        console.log("Tomato rating: " + JSON.parse(body)["tomatoRating"]);
        console.log("Rotten Tomato URL: " + JSON.parse(body)["tomatoURL"]);
		console.log("Plot: " + JSON.parse(body)["Plot"]);
        }
      });    
      });
  };

var spotifyThis = function(){
 inquire.prompt([
    {
      type: "input",
      message: "Name a song title",
      name: "songChoice"
      }
      ]).then(function (spotify) {
      	var Spotify = require('spotify');
		Spotify.search({ type: 'track', query: spotify.songChoice }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    for (i = 0; i < 5; i++){
	 		var refnumber = data.tracks.items[i]
			console.log(refnumber.preview_url)
	 		console.log('"' + refnumber.name + '"'  + ", track " + refnumber.track_number + " on " + refnumber.album.name);
		 		for(j = 0; j < refnumber.artists.length; j++){
					console.log(refnumber.artists[j].name);
		   		}
		   	console.log('-------------------------')
	   	};
		});
	});
  };



var inquire = require('inquirer');

inquire.prompt([
{
  type: "list",
  message: "What would you like to do?",
  choices: ["My Last Tweets", "Search Spotify for a song", "Search a movie", "Random"],
  name: "pickCase"
  }
]).then(function (user) {
  console.log(user.pickCase);

  //Twitter
  switch(user.pickCase) {
    case "My Last Tweets":
    myTweets();
    break;

  //Spotify - Search Spotify for a song
    case "Search Spotify for a song":
    spotifyThis();
    break;

  //Search a movie
    case "Search a movie":
    movieThis();
    break;

  //Random
    case "Random":
    console.log("worked");
    var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(error, data){
		console.log(data);
		if(data.indexOf("spotify") > -1){
			spotifyThis();
		}else if (data.indexOf("movie") > -1){
			movieThis();
		}else {
			myTweets();
		};
		//var dataArr = data.split(',');
		// media = dataArr[1];
		// command = dataArr[0];
		//printSpotify(media, limit);
	});
  }; 
  }); 

