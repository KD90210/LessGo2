let words = [];
let secret = "";
let currentRow = 0;
let col = 0;
let gameover = false;
let guess = "";
const maxRows = 6;

const grid = document.getElementById('grid');

// build grid
for(let i=0;i<maxRows*5;i++){
  const div = document.createElement('div');
  div.className = 'cell';
  grid.appendChild(div);
}

// load words from file
fetch('js/words-EN.txt')
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

  if(guess === secret){
    setTimeout(()=>alert("You win!"),200);
    gameover = true;
  }

  currentRow++;
  col = 0;
  guess = "";

  if(currentRow === maxRows && !gameover){
    setTimeout(()=>alert("You lost! Word was: " + secret),200);
    gameover = true;
  }
}

