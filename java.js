//  get HTML elements ready
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// generata question from trivia database,and fix some dota type to fetch
var quizQuestions =
     [
        {
            "category": "Entertainment: Comics",
            correct_answer: "a",
            "difficulty": "medium",
            answers: [
                "Thomas &amp; Martha",
                "Joey &amp; Jackie",
                "Jason &amp; Sarah",
                "Todd &amp; Mira"
            ],
            "question": "What&#039;s the name of Batman&#039;s parents?",
            "type": "multiple"
        },
        {
            "category": "Entertainment: Film",
            correct_answer: "b",
            "difficulty": "easy",
            answers: [
                "Jackie Chan",
                "Bruce Lee",
                "Jet Li",
                " Yun-Fat Chow"
            ],
            "question": "Who starred in the film 1973 movie &quot;Enter The Dragon&quot;?",
            "type": "multiple"
        },
        {
            "category": "Science: Computers",
            correct_answer: "b",
            "difficulty": "hard",
            answers: [
                "59",
                "50",
                "60",
                "25"
            ],
            "question": "How many Hz does the video standard PAL support?",
            "type": "multiple"
        },
        {
            "category": "Geography",
            correct_answer: "b",
            "difficulty": "medium",
            answers: [
                "Denmark",
                "Sweden",
                "Norway",
                "Germany"
            ],
            "question": "The land of Gotland is located in which European country?",
            "type": "multiple"
        },
        {
            "category": "History",
            correct_answer: "a",
            "difficulty": "medium",
            answers: [
                "Guy Fawkes",
                "Robert Catesby",
                "Francis Tresham",
                "Everard Digby"
            ],
            "question": "Which infamous European traitor was known as &quot;the last person to enter Parliament with honest intentions&quot;?",
            "type": "multiple"
        },
        {
            "category": "History",
            correct_answer: "c",
            "difficulty": "medium",
            answers: [
                "June 22, 1945",
                "August 6, 1945",
                "July 16, 1945",
                "April 5, 1945"
            ],
            "question": "When was &quot;The Gadget&quot;, the first nuclear device to be detonated, tested?",
            "type": "multiple"
        },
        {
            "category": "Entertainment: Video Games",
            correct_answer: "b",
            "difficulty": "easy",
            answers: [
                "Jens Bergensten",
                "Markus Persson",
                "Daniel Rosenfeld",
                "Carl Manneh"
            ],
            "question": "Who created the 2011 Video Game &quot;Minecraft&quot;?",
            "type": "multiple"
        },
        {
            "category": "Entertainment: Video Games",
            correct_answer: "c",
            "difficulty": "hard",
            answers: [
                "Playing a Piano",
                "Using a Composer Software",
                "Singing into a Microphone",
                "Listened to birds at the park"
            ],
            "question": "According to Toby Fox, what was the method to creating the initial tune for Megalovania?",
            "type": "multiple"
        },
        {
            "category": "Art",
            correct_answer: "a",
            "difficulty": "medium",
            answers: [
                "Copic",
                "Dopix",
                "Cofix",
                "Marx"
            ],
            "question": "Which of these are the name of a famous marker brand?",
            "type": "multiple"
        },
        {
            "category": "Entertainment: Music",
            correct_answer: "b",
            "difficulty": "hard",
            answers: [
                "1992",
                "1993",
                "1995",
                "1994"
            ],
            "question": "What year was Min Yoongi from South Korea boy band &quot;BTS&quot; born in?",
            "type": "multiple"
        }
    ]
//  global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.answers[0];
    buttonB.innerHTML = currentQuestion.answers[1];
    buttonC.innerHTML = currentQuestion.answers[2];
    buttonD.innerHTML = currentQuestion.answers[3];
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


// highscore
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});