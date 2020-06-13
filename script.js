// Declaring all variables
var viewHighscore = document.querySelector("#view-highscore");
var homeEl = document.querySelector("#home-page");
var timeEl = document.querySelector("#timer");
var startEl = document.querySelector("#start");
var containerDiv = document.querySelector("#container-div");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#questions")
var choiceEl = document.querySelector("#choices");
var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var choiceD = document.querySelector("#D");
var finalScoreEl = document.querySelector("#finalScore");
var scoreHeadEl = document.querySelector("#scoreHead");
var highscoreEl = document.querySelector("#highscoreEl");
var highscores = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");
var highscoreBtn = document.querySelector("#highscoreBtn");
// Array of questions to display
var questionArr = [
    {
        question : "What does HTML stands for?",
        choiceA : "A. Home Took Markup Language",
        choiceB : "B. Hyper Text Markup Language",
        choiceC : "C. Hyperlinks and Text Markup Language",
        choiceD : "D. Hyper Text Makeup Language",
        answer :  "B"
    }, 
    {
        question : "Choose the correct HTML element for the largest heading:",
        choiceA : "A. <head>",
        choiceB : "B. <h1>",
        choiceC : "C. <heading>",
        choiceD : "D. <h6>",
        answer :  "B"
    },
    {   
        question : "What is the correct HTML element for inserting a line break?",
        choiceA : "A. <br>",
        choiceB : "B. <lb>",
        choiceC : "C. <break>",
        choiceD : "D. <p>",
        answer :  "A"
    },
    {   
        question : "Which of these elements are all <table> elements?",
        choiceA : "A. <table><head><tfoot>",
        choiceB : "B. <table><tr><tt>",
        choiceC : "C. <table><tr><td>",
        choiceD : "D. <thead><body><tr>",
        answer :  "C"
    },
    {   
        question : "What does CSS stand for?",
        choiceA : "A. Creative Style Sheets",
        choiceB : "B. Computer Style Sheets",
        choiceC : "C. Colorfull Style Sheets",
        choiceD : "D. Cascading Style Sheets",
        answer :  "D"
    },
    {   
        question : "Where in an HTML document is the correct place to refer to an external style sheet??",
        choiceA : "A. In the <body> section",
        choiceB : "B. At the end of the document",
        choiceC : "C. In the <head> section",
        choiceD : "D. In the <style> section",
        answer :  "C"
    },
    {   
        question : "Which HTML tag is used to define an internal style sheet?",
        choiceA : "A. <style>",
        choiceB : "B. <script>",
        choiceC : "C. <css>",
        choiceD : "D. <body>",
        answer :  "A"
    },
    {   
        question : "Inside which HTML element do we put the JavaScript??",
        choiceA : "A. <javascipt>",
        choiceB : "B. <scripting>",
        choiceC : "C. <js>",
        choiceD : "D. <script>",
        answer :  "D"
    },
    {   
        question : "How do you create a function in JavaScript?",
        choiceA : "A. function myFunction()",
        choiceB : "B. function = myFunction()",
        choiceC : "C. function: myFunction()",
        choiceD : "D. function - myFunction()",
        answer :  "A"
    },
    {   
        question : "How do you call a function named 'myFunction'?",
        choiceA : "A. call function myFunction",
        choiceB : "B. myFunction()",
        choiceC : "C. call myFunction()",
        choiceD : "D. myFunction[]",
        answer :  "B"
    },
]

var secondsLeft = 60;
var lastQuestionIndex = questionArr.length - 1;
var currentIndex = 0;
var timeInterval;


// Setting attributes
containerDiv.setAttribute("style", "max-width: 70%; margin-top: 100px; text-align: center; margin-left: auto; margin-right: auto");
timeEl.setAttribute("style", "display: none");
quizEl.setAttribute("style", "display: none; max-width: 70%; margin-top: 100px; text-align: center; margin-left: auto; margin-right: auto");
finalScoreEl.setAttribute("style", "display: none; max-width: 70%; margin-top: 100px; margin-left: auto; margin-right: auto");
scoreHeadEl.setAttribute("style", "text-align: center");
highscoreEl.setAttribute("style", "display: none; max-width: 70%; margin-top: 100px; margin-left: auto; margin-right: auto");
highscores.setAttribute("style", "text-align: center");
scoreListEl.setAttribute("style", "text-align: center; list-style-type: none");
highscoreBtn.setAttribute("style", "text-align: center");


homePage();

// Functions:
// Function to start the quiz when user clicks the start button
function homePage() {
    startEl.setAttribute("style", "display: block");
    var homeTitle = document.createElement("h2");
    var homeIntro = document.createElement("p");
    var startBtn = document.createElement("button");
    homeTitle.textContent = "Welcome to Code Quiz!";
    homeIntro.textContent = "Try to answer as many questions within the time limit. Keep in mind that each incorrect answers will penalize your time by 10 seconds!";
    startBtn.textContent = "Start Quiz!";
    startBtn.setAttribute("style", "background-color: black; color: white; border: none; border-radius: 4px; padding: 7px 30px");
    homeEl.appendChild(homeTitle);
    homeEl.appendChild(homeIntro);
    homeEl.appendChild(startBtn);

    // Button to start the quiz!
    startBtn.addEventListener("click", function(event) {
        startQuiz();
        homeEl.removeChild(homeTitle);
        homeEl.removeChild(homeIntro);
        homeEl.removeChild(startBtn);
    });
}

function startQuiz() {
    startEl.style.display = "none";
    quizEl.style.display = "block";
    renderQuestions();
    displayTimer();
}

// Function that renders the questions after the start button or answer buttons are clicked
function renderQuestions() {
    var q = questionArr[currentIndex];
    questionEl.innerHTML = "<h3><strong>Question " + parseInt(currentIndex+1) + "/10 <br>" + q.question + "</strong></h3>";
    choiceA.textContent = q.choiceA;
    choiceB.textContent = q.choiceB;
    choiceC.textContent = q.choiceC;
    choiceD.textContent = q.choiceD;
}

// Displays the timer when the start button is clicked
function displayTimer() {
    timeEl.style.display = "block";
    timeInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time remaining: " + secondsLeft + "s";
        if (secondsLeft < 1) {
            timeEl.textContent = "Time's up!"
            secondsLeft = 0;
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Function to determine the conditions based on the user's answer
function checkAnswer(userAnswer) {
    if (secondsLeft > 0 && currentIndex < lastQuestionIndex) {
        if (questionArr[currentIndex].answer == userAnswer) {
            currentIndex++;
            renderQuestions(); 
            isCorrect();
        } else {
            currentIndex++;
            secondsLeft -= 10;
            renderQuestions();
            isWrong();
        }
    } else {
        currentIndex = 0;
        finalScoreRender();
    }
}

// Notifies the user when the answer is correct
function isCorrect() {
    var comment = document.createElement("h4");
    comment.textContent = "Correct!";
    comment.setAttribute("style", "color: red; font-weight: bold");
    quizEl.appendChild(comment);
    // Correct comment disappear after 0.5s
    var commentInterval = setInterval(function () {
        var commentTime = 1;
        commentTime--;
        if (commentTime < 1) {
            comment.textContent = "";
            clearInterval(commentInterval);
        }
    }, 500);
}

// Notifies the user when the answer is wrong
function isWrong() {
    var comment = document.createElement("h4");
    comment.textContent = "Incorrect!";
    comment.setAttribute("style", "color: red; font-weight: bold");
    quizEl.appendChild(comment);
    // Incorrect comment disappear after 0.5s
    var commentInterval = setInterval(function () {
        var commentTime = 1;
        commentTime--;
        if (commentTime < 1) {
            comment.textContent = "";
            clearInterval(commentInterval);
        }
    }, 500);
}

// Function that displays the quiz summary and an input to store highscores
function finalScoreRender() {
    timeEl.style.display = "none"
    quizEl.style.display = "none";
    finalScoreEl.style.display = "block";
    clearInterval(timeInterval);
    currentIndex = 0;

    if (secondsLeft < 0) {
        secondsLeft = 0;
    }

    var scoreHeader = document.createElement("h2");
    var userScore = document.createElement("p");
    var label = document.createElement("LABEL");
    var userInput = document.createElement("INPUT");
    var submitBtn = document.createElement("button");
    userInput.type = "text";
    userInput.id = "user-input";
    userInput.name = "user-input";
    submitBtn.id = "submit-button";
    scoreHeader.textContent = "All done!";
    userScore.textContent = "Your final score is " + secondsLeft;
    label.textContent = "Enter initials: ";
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("style", "background-color: black; color: white; border: none; border-radius: 4px; padding: 7px 30px; margin-left: 10px");
    scoreHeadEl.appendChild(scoreHeader);
    scoreHeadEl.appendChild(userScore);
    scoreHeadEl.appendChild(label);
    scoreHeadEl.appendChild(userInput);
    scoreHeadEl.appendChild(submitBtn);

    // Button to submit score
    submitBtn.addEventListener("click", function() {
        
        scoreHeadEl.removeChild(scoreHeader);
        scoreHeadEl.removeChild(userScore);
        scoreHeadEl.removeChild(label);
        scoreHeadEl.removeChild(userInput);
        scoreHeadEl.removeChild(submitBtn);
        displayHighscore();
        var scoreText = userInput.value;

        if (scoreText === "") {
            return;
        }

        // Local storage
        // Tried using the moethod on Activity 28 as a reference here. I managed to store the initials in a string but wasn't able to do so for the score
        // Decided to use the method on Activity 23 but it's only able to store 1 input. At least it's storing something
        // Any feedback or guidance would be much appreciated here!
        var score = {
            initials: userInput.value,
            time: secondsLeft.toString(),
        };
        
        userInput.value = "";

        localStorage.setItem("scores", JSON.stringify(score));
        var storedScores = JSON.parse(localStorage.getItem("scores"));
        var i = 1;
        scoreListEl.innerHTML = "";
        var li = document.createElement("li");
        li.textContent = i + ". " + storedScores.initials + " - " + storedScores.time;
        li.setAttribute("style", "font-weight: bold")
        scoreListEl.appendChild(li);
            
        i++;

    })
}

// Function to display all the highscores
function displayHighscore() {
    finalScoreEl.style.display = "none";
    highscoreEl.style.display = "block";
    var highscoreHeader = document.createElement("h2");
    var backBtn = document.createElement("button");
    var clearBtn = document.createElement("button");
    highscoreHeader.textContent = "Highscores";
    backBtn.textContent = "Go Back";
    clearBtn.textContent = "Clear Highscores";
    backBtn.setAttribute("style", "background-color: black; color: white; border: none; border-radius: 4px; padding: 7px 30px; margin-left: 10px");
    clearBtn.setAttribute("style", "background-color: black; color: white; border: none; border-radius: 4px; padding: 7px 30px; margin-left: 10px");
    highscores.appendChild(highscoreHeader);
    highscoreBtn.appendChild(backBtn);
    highscoreBtn.appendChild(clearBtn);

    // Button to go back to the home page
    backBtn.addEventListener("click", function() {
        highscoreEl.style.display = "none";
        highscores.removeChild(highscoreHeader);
        highscoreBtn.removeChild(backBtn);
        highscoreBtn.removeChild(clearBtn);
        secondsLeft = 60;
        homePage();
    });

    // Button to clear the highscore list
    clearBtn.addEventListener("click", function () {
        var myli = document.querySelector("li");
        myli.remove();
    });
}


viewHighscore.addEventListener("click", displayHighscore);