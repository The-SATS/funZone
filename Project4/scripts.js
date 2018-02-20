
$("h4").draggable({
    snap: ".answercont",
    snapMode: "inner",
    snapTolerance: 30,
    revert: "invalid"
});
$(".answerslot").droppable({
    accept: "",
    drop: function (event, ui) {
        $(this)
            .addClass("correct")
    }
});


$(".movie1answer1slot").droppable({
    accept: ".title1",
});

$(".movie1answer2slot").droppable({
    accept: ".year1",
});

$(".movie1answer3slot").droppable({
    accept: ".director1",
});

$(".movie1answer4slot").droppable({
    accept: ".runtime1",
});

$(".movie2answer1slot").droppable({
    accept: ".title2",
});

$(".movie2answer2slot").droppable({
    accept: ".year2",
});

$(".movie2answer3slot").droppable({
    accept: ".director2",
});

$(".movie2answer4slot").droppable({
    accept: ".runtime2",
});

$(".movie3answer1slot").droppable({
    accept: ".title3",
});

$(".movie3answer2slot").droppable({
    accept: ".year3",
});

$(".movie3answer3slot").droppable({
    accept: ".director3",
});

$(".movie3answer4slot").droppable({
    accept: ".runtime3",
});


//function call to make typing happen will have to place into window init function
sort('letter1', 100);
sort('letter2', 8000);
sort('letter3', 15000);

//functions

//number 3 radomizer for class naming

const randomName = function () {

    return Math.floor(Math.random() * 3);
}

//our typing function

//function for copying letters in paragragh to array and starting the typing method call
function sort(className, delay) {
    let letters1 = $(`.${className}`).text().split('');
    $(`.${className}`).text('');
    setTimeout(typing, delay, `${className}`, letters1);
}

//function to star pushing characters to be typed
function typing(para, letters) {

    function type(input, inputArray) {

        $(`.${input}`).append(`<span>${inputArray[index]}`);
        index = index + 1;

        if (index == inputArray.length) {
            //stop call of setInterval Method
            clearInterval(interval);
        }
    }

    //variables for tracking
    const counter = 0;
    var index;

    index = counter;
    var interval = setInterval(type, 60, para, letters);
}

//button presses for start button and replay button

$('.start').on('click', function () {
    window.location = 'quiz.html';
});

$('.reload').on('click', function () {
    window.location.reload();
});


//Quiz page js actions

//functions to create a 7 digit number to add to needed prefix for IMDB api
//Need to create an array that could have 0's preceeding a number up to 7 sig. digits

//pick a random number between 0 - 9

const random = function () {
    let random = Math.floor(Math.random() * 9);
    return random;
}

//function for creating array of 7 indexes with 7 random numbers generated
const numGen = function () {
    let numberInput = [];
    for (let i = 0; i < 7; i++) {
        numberInput.push(random());
    }
    return numberInput;
}

//function for creating 7 digit string to put into imdb database
const inputString = function () {
    let stringInput = '';

    numGen().forEach(function (data) {
        stringInput = stringInput + data;
    });

    return stringInput;
}


for (let i = 0; i < 4; i++) {
    movieCall();

    //function for calling api to get movie info from random 7 digit string
    function movieCall() {

        return $.ajax({
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            dataType: 'jsonp',
            data: {
                //apikey: '9aa522e',
                apikey: 'e4a75d0b',
                i: `tt${inputString()}`,
            }
        }).then(function (res) {
            //check output and print to screen
            if (responseCheck(res) == 'True') {
                ifPosterExist(res);

            } else {
                movieCall();
            };

        });

    }

    //functions to test api data

    const responseCheck = function (data) {
        return data.Response;
    }


    const ifPosterExist = function (data) {
        if (data.Poster == "N/A" || data.Type !== "movie" || data.Language !== "English" || data.Title == "N/A" || data.Director == "N/A" || data.Year == "N/A") {
            movieCall();
        } else {

            //adds poster to container
            $(`.poster${i}`).attr('src', `${data.Poster}`);

            //add title
            $(`.title${i}`).append(`<h4 class="title${i}">${data.Title}</h4>`);

            //add director
            $(`.director${i}`).append(`<h4 class="director${i}">${data.Director}</h4>`);

            //add year
            $(`.year${i}`).append(`<h4 class="year${i}">${data.Year}</h4>`);

            //add runtime
            $(`.runtime${i}`).append(`<h4 class="runtime${i}">${data.Runtime}</h4>`);


        };
    }

}