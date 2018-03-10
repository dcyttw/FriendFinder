// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends, etc.
// ===============================================================================
var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {
    // Empty array to push matched friend
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    };
    // req.body is available since we're using the body-parser middleware
    var userData = req.body;
    var userScores = userData.scores;
    var totalDifference = 0;
    // Loop through friends object and compare
    for (var i = 0; i < friends.length; i++) {
      totalDifference = 0;
      // Loop through the scores of each friend
      for (var j = 0; j < friends[i].scores.length; j++) {
        // calculating the difference between each score and sum them into totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
      }
      // Find Best Match - The closest match will be the user with the least amount of difference.
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    // Add new userData to friends array
    friends.push(userData);
    // Return Best Match
    res.json(bestMatch);
  });
  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friends = [];
    console.log(friends);
    res.json(true);
  });
};