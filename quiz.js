/** Quiz controller **/

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function(){
    return this.questions.length === this.questionIndex;
};

//correct or not answer

Quiz.prototype.guess = function(answer){
    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
};



/** Question **/

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}

Question.prototype.correctAnswer = function(choice){
    return choice === this.answer;
};


/**                 APP           **/

function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

    function guess(id, guess){
        var button = document.getElementById(id);
        button.onclick = function(){
            quiz.guess(guess);
            populate();
        }
    }


// change the progress of questions
function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + randomQuestions.length;
}

function showScores(){
    var suckerImg = "<img width='200' height='170' src='loser.jpg'/>";
    var winnerImg = "<img width='550' height='300' src='winner.jpg'/>";
    var gameOver = "<h1>Result</h1>";
        gameOver += "<h2 id='score'> Your score: " + quiz.score + "</h2>" +
            "<br>" + "<button id='playAgain' onclick='location.href=\"index.html\"'>Play Again</button>"
            + "<span id='viewQuestions' onclick='showQuestions()'>view questions</span>";
        var element = document.getElementById("wrapper");
        element.innerHTML = gameOver;
    if(quiz.score < 2){
        $(suckerImg).insertBefore("#playAgain")
    }else{
        $(winnerImg).insertBefore("#playAgain")
    }
}

function showQuestions(){
    for(i in quiz.questions) {
        if(quiz.questions[i].answer)
       $("<p>"+quiz.questions[i].text+"</p>").insertAfter("#playAgain")
    }
    $("#viewQuestions").hide()
}

var questions=[
    new Question("What is my name bro?", ["Tishkata", "Lebron", "Izdislav", "ivan"], "Tishkata"),
    new Question("What is my height?", ["1.90", "1.72", "1.80", "1.50"], "1.72"),
    new Question("Who is the best club in the world?", ["CSKA", "Litex", "leWCki", "Barcelona"], "CSKA"),
    new Question("My hometown?", ["Mezdra", "Sofia", "New York", "Vratsa"], "Vratsa"),
    new Question("What?", ["N6", "Lebron", "Iz", "an"], "nothing")
];

//Random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//pick random question and push em in array
var randomQuestions = []
while(randomQuestions.length < 4){
    var randomnumber = questions[getRandomInt(0,4)];
    if(randomQuestions.indexOf(randomnumber) > -1) continue;
    randomQuestions[randomQuestions.length] = randomnumber;
}
console.log(randomQuestions);
var quiz = new Quiz(randomQuestions);

populate();