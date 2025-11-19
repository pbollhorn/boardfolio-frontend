import casual from 'casual';

// TODO: Remember to put "json-server" under "devDependencies" instead of "dependencies"
// TODO: Remember to say in README to run npm install

// This script creates mock data to be put in mock-db.json
// Instructions for use:
// 1. Run this script using Node: node createmockdata.js
// 2. Copy paste the output from terminal into mock-db.json


// Create an object for config file
var db = {books:[]};

for(var i=101; i<=115; i++){
    var book = {};
  book.id = i;

  // Create a random 1-6 word title
  book.title = casual.words(casual.integer(1,6));
  book.author = casual.first_name + ' ' + casual.last_name;
  
  // Randomly rate the book between 0 and 5
  book.rating = Math.floor(Math.random()*100+1)/20;

  // Assign a publishing year between 1700 and 2016
    book.year_published = casual.integer(1700,2016)
    db.books.push(book);
}
console.log(JSON.stringify(db));