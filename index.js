const axios = require('axios');
const csv = require('fast-csv');
const fs = require('fs');

var stream = fs.createReadStream("./test.csv");
let array_id = "";
let id = "";
let publish = "";
let name = "";

// 1. Read the CSV and get the "Title" value
function ReadCSV () {
  csv
    .fromStream(stream, {headers : ["Type", "Title", "Id", "Publish"]})
    .on("data", function(data){
        // console.log('Info - ID :', data.Id)
        // console.log('Info - Will be publish ? - ', data.Publish)
        id = data.Id;
        publish = data.Publish;
        title = data.Title;
        array_id += [data.Id + ";"];
        console.log("Info - 1 personnage found : ", data.Title)
        GetSomeShit();
        UpdateSomeShit();
      })
    .on("end", function(){

        console.log('Info - IDs : [', array_id + " ]")

      });

  }
// 2. Make a get request to get all ID in an array
function GetSomeShit () {
  // Make a request
  axios.get('http://localhost:3000/personnages/' + id )
    .then(function (response) {

    })
    .catch(function (error) {
      console.log("Error - 0 personnage found with id : ", id)

    });

}


// 3. Update publish parameter for personnages
function UpdateSomeShit () {
  axios.put('http://localhost:3000/personnages/' + id, {
    title: title,
    publish: publish

  })
  .then(response => {
    console.log("Info - Updating " + response.data.title + " with publish=" + publish)
  })
  .catch(error => {
    console.log("Error - While updating", error);
  });

}

// 4. Start script
ReadCSV();
