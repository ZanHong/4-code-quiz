var timeEl = document.querySelector(".timer");
var startEl = document.querySelector(".start");
var startBtn = document.querySelector("#start-button");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#questions")
var choiceEl = document.querySelector("#choices");
var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var choiceD = document.querySelector("#D");
var finalScoreEl = document.querySelector("#finalScore");

var questionArr = [
    {
        question : "What does HTML stands for?",
        choiceA : "Home Took Markup Language",
        choiceB : "Hyper Text Markup Language",
        choiceC : "Hyperlinks and Text Markup Language",
        choiceD : "Hyper Text Makeup Language",
        answer :  "B"
    }, 
    {
        question : "Choose the correct HTML element for the largest heading:",
        choiceA : "<head>",
        choiceB : "<h1>",
        choiceC : "<heading>",
        choiceD : "<h6>",
        answer :  "B"
    },
    {   
        question : "What is the correct HTML element for inserting a line break?",
        choiceA : "<br>",
        choiceB : "<lb>",
        choiceC : "<break>",
        choiceD : "<p>",
        answer :  "A"
    },
    {   
        question : "Which of these elements are all <table> elements?",
        choiceA : "<table><head><tfoot>",
        choiceB : "<table><tr><tt>",
        choiceC : "<table><tr><td>",
        choiceD : "<thead><body><tr>",
        answer :  "C"
    },
    {   
        question : "What does CSS stand for?",
        choiceA : "Creative Style Sheets",
        choiceB : "Computer Style Sheets",
        choiceC : "Colorfull Style Sheets",
        choiceD : "Cascading Style Sheets",
        answer :  "D"
    },
    {   
        question : "Where in an HTML document is the correct place to refer to an external style sheet??",
        choiceA : "In the <body> section",
        choiceB : "At the end of the document",
        choiceC : "In the <head> section",
        choiceD : "In the <style> section",
        answer :  "C"
    },
    {   
        question : "Which HTML tag is used to define an internal style sheet?",
        choiceA : "<style>",
        choiceB : "<script>",
        choiceC : "<css>",
        choiceD : "<body>",
        answer :  "A"
    },
    {   
        question : "Inside which HTML element do we put the JavaScript??",
        choiceA : "<javascipt>",
        choiceB : "<scripting>",
        choiceC : "<js>",
        choiceD : "<script>",
        answer :  "D"
    },
    {   
        question : "How do you create a function in JavaScript?",
        choiceA : "function myFunction()",
        choiceB : "function = myFunction()",
        choiceC : "function: myFunction()",
        choiceD : "function - myFunction()",
        answer :  "A"
    },
    {   
        question : "How do you call a function named 'myFunction'?",
        choiceA : "call function myFunction",
        choiceB : "myFunction()",
        choiceC : "call myFunction()",
        choiceD : "myFunction[]",
        answer :  "B"
    },
]

var secondsLeft = 60;
var lastQuestionIndex = questionArr.length - 1;
var currentIndex = 0;

startEl.setAttribute("style", "display: block");
quizEl.setAttribute("style", "display: none");
finalScoreEl.setAttribute("style", "display: none");

function startQuiz() {
    startEl.style.display = "none";
    quizEl.style.display = "block";
    renderQuestions();
    displayTimer();
}

function renderQuestions() {
    var q = questionArr[currentIndex];
    questionEl.innerHTML = "<h3><strong>Question " + parseInt(currentIndex+1) + "/10 <br>" + q.question + "</strong></h3>";
    choiceA.textContent = q.choiceA;
    choiceB.textContent = q.choiceB;
    choiceC.textContent = q.choiceC;
    choiceD.textContent = q.choiceD;
}

function displayTimer() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time remaining: " + secondsLeft + "s";
        if (secondsLeft < 1) {
            timeEl.textContent = "Time's up!"
            clearInterval(timeInterval);
        }
    }, 1000);
}

function isCorrect(userAnswer) {
    if (secondsLeft > 0 && currentIndex < lastQuestionIndex) {
        if (questionArr[currentIndex].answer == userAnswer) {
            currentIndex++;
            renderQuestions(); 
        } else {
            currentIndex++;
            secondsLeft -= 10;
            renderQuestions();
            var comment = document.createElement("h4");
            comment.textContent = "Incorrect!";
            comment.setAttribute("style", "color: red; font-weight: bold");
            quizEl.appendChild(comment);
            var incorrectInterval = setInterval(function () {
                var incorrentTime = 1;
                incorrentTime--;
                if (incorrentTime < 1) {
                    comment.textContent = "";
                    clearInterval(incorrectInterval);
                }
            }, 1000);
                
        }
    } else {
        clearInterval(timeInterval);
        finalScoreRender();
    }
}

function finalScoreRender() {
    quizEl.style.display = "none";
    finalScoreEl.style.display = "block";
    
}

startBtn.addEventListener("click", startQuiz);