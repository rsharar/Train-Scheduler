// pseudo code

// CALCULATE MINAWAY
// check current time
// use moment.js to determine # of mins from what user entered
// if firstTrainTime > currenttime
  // next arrival === firstTrainTime
// else if (firstTrainTime < currentTime) 
  // nextArrival = currentTime + frequency

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCT4HT-Y99MmSifr2vWdhyLVRcQzQDhtCA",
    authDomain: "train-scheduler-e6e1f.firebaseapp.com",
    databaseURL: "https://train-scheduler-e6e1f.firebaseio.com",
    projectId: "train-scheduler-e6e1f",
    storageBucket: "train-scheduler-e6e1f.appspot.com",
    messagingSenderId: "961674848033"
  };
  
  firebase.initializeApp(config);


//---------- VARIABLES ---------//

// declare userTrainName to store form submission
var userTrainName;

// declare userTrainDestination to store form submission
var userTrainDestination;

// declare userFirstTrainTime to store form submission
var userFirstTrainTime;

// declare userTrainFrequency to store form submission
var userTrainFrequency;

// userTrainInput object
var userTrainInput = {};

// firebase DB reference
var database = firebase.database();

var nextArrival;
var minAway; 

//---------- FUNCTIONS ---------//


// when user submits train form, data pushed as new obj to firebase DB and form fields clear
function addTrain(){
  $("#submit-btn").on('click',function(event){
  
  event.preventDefault();

  var userTrainName = $("#train-name").val().trim();
    console.log(userTrainName);

  var userTrainDestination = $("#destination").val().trim();
    console.log(userTrainDestination);

  var userFirstTrainTime = $("#first-train-time").val().trim();
    console.log(userFirstTrainTime);

  var userTrainFrequency = $("#frequency").val().trim();
    console.log(userTrainFrequency);

  database.ref().push({
      name: userTrainName,
      destination: userTrainDestination,
      time: userFirstTrainTime,
      frequency: userTrainFrequency
  });

   // Clears all of the text-boxes
   $("#train-name").val("");
   $("#destination").val("");
   $("#first-train-time").val("");
   $("#frequency").val("");
})
}

// function to pull data from firebase DB and populate HTML
function populateTrainData(){
  database.ref().on("child_added", function(snapshot){
    // console.log(snapshot.val());


  // all values from DB stored in variables
  var userTrainName = snapshot.val().name;
  var userTrainDestination = snapshot.val().destination;
  var userFirstTrainTime = snapshot.val().time;
  var userTrainFrequency = snapshot.val().frequency;

  // convert firstTrainTime to military time format
  var firstTrainTimeConverted = moment(userFirstTrainTime, "HH:mm")
  console.log(firstTrainTimeConverted);

  // current time
  var currentTime = moment().format("hh:mm");
  console.log(currentTime);

  // difference between times
  var diffTime = moment().diff(moment(firstTrainTimeConverted),'minutes');
  console.log(diffTime);

  // time apart (with remainder)
  var trainRemainder = diffTime % userTrainFrequency
  console.log(trainRemainder);

  // minAway
  var minAway = userTrainFrequency - trainRemainder
  console.log(minAway);

  var nextArrival = moment().add(minAway, "minutes");
  console.log(moment(nextArrival).format("hh:mm"));

  // new row selector for each form entry
  var newRow = $("<tr>").append(
    $("<td>").text(userTrainName),
    $("<td>").text(userTrainDestination),
    $("<td>").text(userTrainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway),
  );
  console.log(newRow);
  
  $("tbody").append(newRow);
  })
}


//---------- EVENT LISTENERS ---------//

$(document).ready(function(){
  addTrain();
  populateTrainData();
});
