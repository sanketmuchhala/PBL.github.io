let lives, maxLives, letterFound, history, allLetters, ourLetters, word, rnd;

let words = [['SQLServer', 'Not a SQL database'], ['Casandra', 'Wide Column Store'], ['KeyValue', 'Simplest NOSQL database'], ['Redis', ' KeyValue Database'], ['Riak', 'Based on Amazon Dynamo paper'], ['Schemaless', 'Not to define any structure'], ['Nosql', 'Horizontally scalable'], ['Mongodb', 'Document Database'], ['Replication', 'To maintain availability in NoSQL'], ['Collection', 'A set of records, typically documents, that are grouped together.']];
let letterLines = document.querySelector('#word-lines');
const scoreOutput = document.getElementById("score");
let score = 0;
//Choose random word-hint pair, create lines for the letters
let randomNumber = () => {
    rnd = Math.floor(Math.random() * Math.floor(words.length));
    return rnd;
}

let random = (words) => {
    randomNumber();
    let currentWord = words[rnd][0];
    for (let i = 0; i<currentWord.length; i++) {
        var div = document.createElement('div');
        letterLines.appendChild(div);
        div.classList.add('line');
    }
    return currentWord;
};

word = random(words);

//Validate input field (only one letter), get input (Guess - event listener), compare with currentWord's letters
const input = document.querySelector('#input-field');
const guess = document.querySelector('#button-guess');

lives = document.querySelector('#lives');
maxLives = 10;
lives.textContent = `You have ${maxLives} lives.`;
history = '';
allLetters = word.length;
ourLetters = 0;
let showLetter = document.querySelectorAll('.line');

guess.addEventListener('click', game);
input.addEventListener('keyup', ent);

function ent(e) {
    if (e.keyCode === 13) {
        game();
    }
};

function game() {
    let letters = /^[A-Za-z]+$/;
    history.split('');
    let correct = [];
    if (history.indexOf(input.value.toUpperCase())==-1) {
        if (input.value.match(letters)) {
            for (let i = 0; i < word.length; i++) {
                if (input.value.toUpperCase() == word[i].toUpperCase()) {
                    // Print letter to the screen
                    let letterContainer = document.createElement('div');
                    let myLetter = document.createTextNode(input.value.toUpperCase());
                    
                    if (showLetter[i].firstChild == undefined) {
                       showLetter[i].appendChild(letterContainer);
                        letterContainer.appendChild(myLetter);
                        letterContainer.classList.add('container');
                    }
                    letterFound = true;
                    correct.push(input.value.toUpperCase());
                } else if (correct.length <= 0){
                    letterFound = false;
                }
            };
        } else {
            alert('Enter a valid letter!');
        }
    
       if (letterFound == false) {
            document.querySelector('.wrong').textContent += input.value.toUpperCase();
            maxLives--;
            if (maxLives == 0) {
                alert('You ran out of lives!');
                guess.removeEventListener('click', game);
                input.removeEventListener('keyup', ent);
				score=0;
            }
            lives.textContent = `You have ${maxLives} lives.`;
			score-=1;
        } else {
            ourLetters++;
            if (ourLetters == allLetters) {
                alert(`Congrats! You found the word: ${word.toUpperCase()}!`);
                guess.removeEventListener('click', game);
            }
			score+=1;
        }
		
				 updateBoard();
    }
    history += input.value.toUpperCase();
    input.value = '';
};
function updateBoard() {
  scoreOutput.innerHTML = score;
}

//Show hint
const hint = document.querySelector('#button-hint');
hint.addEventListener('click', function(){
    document.querySelector('.hint').textContent = words[rnd][1];
});

//New game
const newGame = document.querySelector('#button-new');
newGame.addEventListener('click', function(){
    document.location.reload(true);
});