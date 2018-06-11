var config = {
    apiKey: "AIzaSyC1AMU_Z0rMZxnzHD73ho6LzwzU2wE1uF0",
    authDomain: "trainproject-c91ea.firebaseapp.com",
    databaseURL: "https://trainproject-c91ea.firebaseio.com",
    projectId: "trainproject-c91ea",
    storageBucket: "trainproject-c91ea.appspot.com",
    messagingSenderId: "28763555488"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var firstArrival = $("#nextArrivalInput").val().trim();
    // var minutesAway = $("#minutesAwayInput").val().trim();

    var train = {
        trainName,
        destination,
        frequency,
        firstArrival,
        // minutesAway,
    };

    database.ref().push(train);

    console.log(train.name);
    console.log(train.place);
    console.log(train.occurance);
    console.log(train.time);
    console.log(train.minutes);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#nextArrivalInput").val("");
    $("#minutesAwayInput").val("");

});

database.ref().on("child_added", function (childsnapshot) {
    var trainName = childsnapshot.val().trainName;
    var destination = childsnapshot.val().destination;
    var frequency = childsnapshot.val().frequency;
    var firstArrival = childsnapshot.val().firstArrival;
    // var minutesAway = childsnapshot.val().minutesAway;

    console.log(childsnapshot);
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstArrival);
    // console.log(minutesAway);
// now + minute away

    var firstArrivalMoment = moment(firstArrival, "HH:mm").subtract(1, "years");

    var firstArrivalMinutes = moment().diff(moment(firstArrivalMoment), "minutes");
    var timeRemainder = firstArrivalMinutes%frequency;
    
    var minutesAway = frequency - timeRemainder; 

    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("HH:mm");

    console.log(firstArrivalMoment);

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")
});



