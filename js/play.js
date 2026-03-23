const words = ["apple","grape","stone","light","chair","plant","mouse","table","bread","water"];
let secret = words[Math.floor(Math.random()*words.length)];
let currentRow = 0;
const maxRows = 6;

const grid = document.getElementById('grid');
for(let i=0;i<maxRows*5;i++){
  const div = document.createElement('div');
  div.className = 'cell';
  grid.appendChild(div);
}

function submitGuess(){
  const input = document.getElementById('guessInput');
  const guess = input.value.toLowerCase();
  if(guess.length !== 5) return alert("Enter 5 letters");

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
