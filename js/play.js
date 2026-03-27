let words = [];
let secret = "";
let currentRow = 0;
const maxRows = 6;

const grid = document.getElementById('grid');

// build grid
for(let i=0;i<maxRows*5;i++){
  const div = document.createElement('div');
  div.className = 'cell';
  grid.appendChild(div);
}

// load words from file
fetch('js/words.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split('\n').map(line =>
      line.replace(/,/g, '').trim()
    );

    // keep only real 5-letter words
    words = words.filter(word => word.length === 5);

    // pick secret word
    secret = words[Math.floor(Math.random() * words.length)];

    console.log("Secret word:", secret); // debug
  });

function submitGuess(){
  const input = document.getElementById('guessInput');
  const guess = input.value.toLowerCase();

  if(guess.length !== 5) return alert("Enter 5 letters");

  if(!words.includes(guess)){
    alert("Not a valid word!");
    return;
  }

  for(let i=0;i<5;i++){
    const cell = grid.children[currentRow*5 + i];
    cell.textContent = guess[i];

    if(guess[i] === secret[i]){
      cell.classList.add('green');
    } else if(secret.includes(guess[i])){
      cell.classList.add('yellow');
    } else {
      cell.classList.add('red');
    }
  }

  if(guess === secret){
    setTimeout(()=>alert("You win!"),200);
  }

  currentRow++;
  input.value = '';

  if(currentRow === maxRows && guess !== secret){
    setTimeout(()=>alert("You lost! Word was: " + secret),200);
  }
}
