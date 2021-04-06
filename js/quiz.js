'use strict';

let currentQuestion = 0; 
let score = 0;

//list of questions
const jsQuestions = [   
    {question: "Which of the following is not a NoSQL database?", 
    a: "SQL Server", 
    b: "MongoDB", 
    c: "Cassandra",
    d: "None of the mentioned",
    correct: "a",
    userfeedback: null,
    userGuess: null
 },
    {question: "Which of the following is a NoSQL Database Type?", 
    a: "SQL", 
    b: "Document Databases", 
    c: "JSON",
    d: "All of the mentioned",
    correct: "b",
    userfeedback: null,
    userGuess: null
 },    
     {question: "Which of the following is a wide-column store?", 
     a: "Cassendra", 
     b: "Riak", 
     c: "MongoDB",
     d: "Redis",
     correct: "a",
     userfeedback: null,
     userGuess: null
 },
     {question: "Most NoSQL databases support automatic __________ meaning that you get high availability and disaster recovery.", 
     a: "Processing", 
     b: "Scalability", 
     c: "Replication",
     d: "All of the mentioned",
     correct: "c",
     userfeedback: null,
     userGuess: null
 },
     {question: "Which of the following are the simplest NoSQL databases?", 
     a: "Key-Value", 
     b: "Wide-Column", 
     c: "Document",
     d: "All of the mentioned",
     correct: "a",
     userfeedback: null,
     userGuess: null
 },
     {question: "Instead of Primary Key mongoDB use?", 
     a: "Embedded Documents", 
     b: "Default key_id", 
     c: "MongoDB",
     d: "Mongo",
     correct: "b",
     userfeedback: null,
     userGuess: null
 },
     {question: "Which of the following operator can be used to control the number of items of an array that a query return?", 
     a: "$", 
     b: "$elemMatch", 
     c: "$slice",
     d: "MongoDB does not support partial retrieval of items from an array",
     correct: "c",
     userfeedback: null,
     userGuess: null
 },
     {question: "Which of the following is a characteristic of a NoSQL database?", 
     a: "Uses JSON", 
     b: "Requires JOINs", 
     c: "Needs a schema",
     d: "Uses tables for storage",
     correct: "a",
     userfeedback: null,
     userGuess: null
 },
     {question: "Which of the following is not an example of a NoSQL database management system?", 
     a: "HBase", 
     b: "MongoDB", 
     c: "CouchDB",
     d: "PostgreSQL",
     correct: "d",
     userfeedback: null,
     userGuess: null
 },
     {question: "Which of the following is a reason to use an SQL database?", 
     a: "It's ACID-compliant.", 
     b: "It can easily store unstructured data. It's ACID-compliant.", 
     c: "It can enable development in the cloud",
     d: "None of above",
     correct: "a",
     userfeedback: null,
     userGuess: null
 }];

let jsLength = jsQuestions.length - 1;

//goes to first question in the quiz when start button selected
function handleStartButton () {
    $( '.start' ).on('click','.start-button', function (event) {
        displayQuestion (event);
        $('.start').hide();
        $('.quiz').show();
    });
    
}

//displays the question to the user
function displayQuestion (event) {
    
        $('.quiz').html( `
    <header>
    <div class="page-count"> Question ${(currentQuestion + 1 )} of  ${(jsQuestions.length)}</div>
    <div class="score-count"> Score ${(score)} out of ${(jsQuestions.length)}</div>
    </header>
    <section class="question-container">
        <form role="form">
            <p class="form-question">${jsQuestions[currentQuestion].question}</p>
                <label class="input-container">a: ${jsQuestions[currentQuestion].a}
                    <input type="radio" name="q" value="a" role="radio">
                </label>
                <label class="input-container">b: ${jsQuestions[currentQuestion].b}
                    <input type="radio" name="q" value="b" role="radio">
                </label>
                <label class="input-container">c: ${jsQuestions[currentQuestion].c}
                    <input type="radio" name="q" value="c" role="radio">
                </label>
                <label class="input-container">d: ${jsQuestions[currentQuestion].d}
                    <input type="radio" name="q" value="d" role="radio">
                </label> 
                <button type="submit" class="submit-button" role="button">Submit</button>
        </form>

    </section>
   `);

}

//Listener for handeling the guess of user
function handleSubmitQuestion() {
    $('.quiz').on('submit','form',function(event) {
      event.preventDefault();
      $("input[type=radio]").attr('disabled', true);
      
      const selectedAnswer = $('input[name=q]:checked').val()
      handleGuess(selectedAnswer)
    })
}

function handleGuess(selectedAnswer) {
    jsQuestions[currentQuestion].userGuess = selectedAnswer
  
// This is where the comparsion of user guess and actual answer
    if (jsQuestions[currentQuestion].userGuess === jsQuestions[currentQuestion].correct) {
        $('question-container').html(correctAnswerHTML());  
        incrementScore();
    } else {
        $('question-container').html(wrongAnswerHTML());
  }
}

function incrementScore () {
    score = score + 1;
}

//if the user gets the question right, this html is displayed
function correctAnswerHTML () {
    if (currentQuestion == jsLength) {
        $('.submit-button').hide();  
        $('.question-container').append( `<div class="question-result">
           <button type="button" class="next-question mobile-button" role="button">View Final Score</button></div> 
           <h3 class="result-placement">Correct!</h3>`);
    } else {
    $('.submit-button').hide();  
    $('.question-container').append( `<div class="question-result">
            <button type="button" class="next-question mobile-button" role="button">Next</button></div>
            <h5 class="result-placement">Correct!</h5>`);
    }
}

//if the user gets the question right, this html is displayed
function wrongAnswerHTML () {
    if (currentQuestion == jsLength){
        $('.submit-button').hide();  
        $('.question-container').append( `<div class="question-result">
            <button type="button" class="next-question mobile-button" role="button">View Final Score</button> </div>
            <h4 class="result-placement"><span>Wrong! </span>The correct answer is ${(jsQuestions[currentQuestion].correct)}</h4>`);
    } else {
    $('.submit-button').hide();  
    $('.question-container').append( `<div class="question-result">
            <button type="button" class="next-question mobile-button" role="button">Next</button> </div>
            <h4 class="result-placement"><span>Wrong! </span>The correct answer is ${(jsQuestions[currentQuestion].correct)}</h4>`);
    }
}

function handleNextQuestion () {
    $( '.right-side' ).on('click', '.next-question', function (){
        if (currentQuestion < jsLength ) {
            currentQuestion += 1; 
            console.log('next question');  
            displayQuestion (event);
        } else { 
            $('form').hide();
            $('.page-count').hide();
            $('.result-placement').hide()
            $('.score-count').hide();
            $('.next-question').hide();
            handleFinalScore();
        }  
    });
}

function handleFinalScore () {
    $('.see-final').hide();
    $('.question-result').html( `<div class="results">
        <h3>Final Score ${(score)} out of ${(jsQuestions.length)}</h3>
            <button type="button" class="restart-quiz" role="button">Restart Quiz</button>
        </div>`);
}

function handleRestartQuiz() {
    $( '.right-side' ).on('click', '.restart-quiz', function () {
        currentQuestion = 0;
        score = 0;
        displayQuestion();
  });
}

function quizApp() {
    handleStartButton();
    handleSubmitQuestion();
    handleNextQuestion ();
    handleFinalScore ();
    handleRestartQuiz ();
}
  
$(quizApp);

