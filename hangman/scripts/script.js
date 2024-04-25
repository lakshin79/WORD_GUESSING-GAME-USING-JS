const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const gameModel = document.querySelector(".game-model");

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("");
    console.log(word,hint);
    currentWord = word;
}

const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modelText = isVictory ? `You found the word : ` : `The correct word was : `;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    },500);
}

const initGame = (button, clickedLetter) => {
    console.log(button,clickedLetter);
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index) => {
            if(letter == clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) {
        return gameOver(false);
    }

    if(correctLetters.length === currentWord.length) {
        return gameOver(true);
    }
}

for(let i=97;i<=122;i++){
    const button = document.createElement('button');  
    button.innerText = String.fromCharCode(i); 
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();