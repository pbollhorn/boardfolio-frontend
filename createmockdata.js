import casual from "casual";

// TODO: Remember to put "json-server" under "devDependencies" instead of "dependencies"
// TODO: Remember to say in README to run npm install

// This script creates mock data to be put in mock-db.json
// Instructions for use:
// 1. Run this script using Node: node createmockdata.js
// 2. Copy paste the output from terminal into mock-db.json

// Create an object for config file
var db = { boardgames: [] };

for (var i = 101; i <= 115; i++) {
  var game = {};
  game.id = i;

  // Create a random 1-6 word title
  game.title = casual.words(casual.integer(1, 6));
  game.author = casual.first_name + " " + casual.last_name;

  // // Randomly rate the book between 0 and 5
  // game.rating = Math.floor(Math.random()*100+1)/20;

  // Assign a release year between 1900 and 2025
  game.release_year = casual.integer(1900, 2025);


  game.genre = ["Adventure","Animals","Dice","Fantasy","Horror"][Math.floor(Math.random()*5)];



  db.boardgames.push(game);
}
// console.log(JSON.stringify(db));
console.log(JSON.stringify(db, null, 2));
