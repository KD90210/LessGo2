import { getCurrentLanguage } from "./language.js";

let words = [];
let secret = "";
let currentRow = 0;
let col = 0;
let gameover = false;
let guess = "";
let startTime = Date.now();
let timerInterval;
const maxRows = 6;
let current_lang = getCurrentLanguage();

const grid = document.getElementById('grid');

// build grid
for(let i=0;i<maxRows*5;i++){
  const div = document.createElement('div');
  div.className = 'cell';
  grid.appendChild(div);
}

console.log(`Loading words from js/words-${current_lang}.txt ...`);
// load words from file
fetch('js/words-en.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split('\n').map(line =>
      line.replace(/,/g, '').trim()
    );

    // keep only real 5-letter words
    words = words.filter(word => word.length === 5);

    // pick secret word
    secret = words[Math.floor(Math.random() * words.length)];

    console.log("Secret word:", secret);
  });
  // handle key presses
  document.addEventListener ("keydown", (e) => {
    if(gameover) return;
    
    if (e.key === 'Enter') {
      submitGuess();
      return;
    }
  // handle backspace
    if(e.key === 'Backspace'){
    if(col > 0){
      col--;
      guess = guess.slice(0, -1);
      const cell = grid.children[currentRow*5 + col];
      cell.textContent = "";
    }
    return;
  }
    // handle letter input
    if(e.key.length === 1 && e.key.match(/[a-zA-Z]/)){
      if(col < 5){
        const letter = e.key.toLowerCase();
        const cell = grid.children[currentRow*5 + col];
        cell.textContent = e.key.toLowerCase();     
        guess += letter;
        col++;
      }
    }; 
  });

function submitGuess(){

  if(guess.length !== 5) {
    alert("Enter 5 letters");
  return;
  }

  if(!words.includes(guess)){
    alert("Not a valid word!");
    return;
  }

let secretArr = secret.split('');
let guessArr = guess.split('');


  for(let i=0;i<5;i++){
    const cell = grid.children[currentRow*5 + i];
    
    // green
    if(guessArr[i] === secretArr[i]){
      cell.classList.add('green');
      secretArr[i] = null;
      guessArr[i] = null;
    }
  }

  // yellow and red
  for(let i=0;i<5;i++){
    const cell = grid.children[currentRow*5 + i];
    
    if(guessArr[i] === null) continue;

    let index = secretArr.indexOf(guessArr[i]);
    if(index !== -1){
      cell.classList.add('yellow');
      secretArr[index] = null;
    } else {
      cell.classList.add('red');
    }
  }

  if (guess === secret) {
  gameover = true;

  clearInterval(timerInterval);

  document.getElementById("FinalTime").textContent = 
    document.getElementById("timer").textContent;

  setTimeout(() => {
    document.getElementById("victoryScreen").classList.remove("hidden");
  }, 200);
}

  currentRow++;
  col = 0;
  guess = "";

  if(currentRow === maxRows && !gameover){
  gameover = true;

  clearInterval(timerInterval);

  // show the correct word
  document.getElementById("lostWord").textContent = secret;

  document.getElementById("FinalTimeLose").textContent = 
    document.getElementById("timer").textContent;


  setTimeout(() => {
    document.getElementById("loseScreen").classList.remove("hidden");
  }, 200);
}
}

document.getElementById("playAgainBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  startTimer();

  // hide victory screen
  document.getElementById("victoryScreen").classList.add("hidden");

  // reset variables
  currentRow = 0;
  col = 0;
  guess = "";
  gameover = false;

  // clear grid
  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].textContent = "";
    grid.children[i].classList.remove("green", "yellow", "red");
  }

  // pick new word
  secret = words[Math.floor(Math.random() * words.length)];

  console.log("New secret:", secret);
});

// PLAY AGAIN (LOSE)
document.getElementById("playAgainLoseBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  startTimer();

  document.getElementById("loseScreen").classList.add("hidden");

  currentRow = 0;
  col = 0;
  guess = "";
  gameover = false;

  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].textContent = "";
    grid.children[i].classList.remove("green", "yellow", "red");
  }

  secret = words[Math.floor(Math.random() * words.length)];
});


function startTimer() {
  startTime = Date.now();

  timerInterval = setInterval(() => {
    let now = Date.now();
    let diff = Math.floor((now - startTime) / 1000);

    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;

    document.getElementById("timer").textContent =
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}
startTimer();
