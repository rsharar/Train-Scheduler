// pseudo code

// FORM SUBMISSION

// user enters data for train name --> no data val
  // store in variable userTrainName
// user enters destination --> data val: no integers
  // store in variable userTrainDestination
// user enters first train time --> data val: military time only
  // store in variable userFirstTrainTime
// user enters frequency --> data val: integers only
  // store in variable userTrainFrequency

// create object userTrainInput with key value pairs using variables above

// onclick of submit button:
  // if destination and train name does not exist already
  // -- push data to firebase as new object
  // -- populate data as new row in HTML


// CALCULATE MINAWAY
// check current time
// use moment.js to determine # of mins from what user entered
// if firstTrainTime > currenttime
  // next arrival === firstTrainTime
// else if (firstTrainTime < currentTime) 
  // nextArrival = currentTime + frequency

//PULL TRAIN INFO FROM DB TO HTML



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
    console.log(snapshot.val());

  // get currenttime
  var currentTime = moment().format("HH:mm")
  console.log(currentTime);

  // all values from DB stored in variables
  var userTrainName = snapshot.val().name;
  var userTrainDestination = snapshot.val().destination;
  var userFirstTrainTime = snapshot.val().time;
  var userTrainFrequency = snapshot.val().frequency;


  var minutesAway;

  // new row selector for each form entry
  var newRow = $("<tr>").append(
    $("<td>").text(userTrainName),
    $("<td>").text(userTrainDestination),
    $("<td>").text(userFirstTrainTime),
    $("<td>").text(userTrainFrequency),
    $("<td>").text(minutesAway),
  );
  console.log(newRow);
  
  $("tbody").append(newRow);
  })
}

var currentTime = moment().format("HH:mm")
console.log(currentTime);

//---------- EVENT LISTENERS ---------//

$(document).ready(function(){
  addTrain();
  populateTrainData();
});
