
const wordList = ['LUFFY', 'KAIDO', 'ROGER', 'PIECE', 'ROBIN', 
                  'BROOK', 'NAMI', 'USSOP', 'ZORO', 'SANJI'];

let secretWord = '';          
let shownLetters = [];        
let triesLeft = 5;            
let gameActive = true;        // Game state

// Inicijaliziraj igrata
function startGame() {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    shownLetters = Array(secretWord.length).fill('_');
    
    let random1=[]; //random index, so cel random bukvi da se pokazani na pocetok na igrata
    while(random1.length<2){
        let randomIndex = Math.floor(Math.random()*secretWord.length);
        if(!random1.includes(randomIndex)){
            random1.push(randomIndex);
            shownLetters[randomIndex]=secretWord[randomIndex];
        }
    }
    
    triesLeft = 5;
    gameActive = true;
    document.getElementById('message').textContent = '';
    document.getElementById('letterInput').value = '';
    updateDisplay();
    document.getElementById('gamepopup').style.display = 'none';
    document.getElementById('letterInput').focus();
}


function updateDisplay() {
    document.getElementById('wordid').textContent = shownLetters.join(' ');
    document.getElementById('triesLeft').textContent = `Tries left: ${triesLeft}`;
}

//proverka dali bukvata e vo zborot
function checkletter() {
    if (!gameActive) return;

    const input = document.getElementById('letterInput');
    const letter = input.value.toUpperCase();
    input.value = '';  
    if (!letter) {
        document.getElementById('message').textContent = 'Please enter a letter!';
        return;
    }
    let letterFound = false;
    for (let i = 0; i < secretWord.length; i++) {  
        if (secretWord[i] === letter && shownLetters[i] === '_') {
            shownLetters[i] = letter;
            letterFound = true;
        }
    }
    if (!letterFound) {
        triesLeft--;
        document.getElementById('message').textContent = `Letter '${letter}' is not in the word!`;
    } else {
        document.getElementById('message').textContent = `Good guess! '${letter}' is in the word!`;
    }
    if (!shownLetters.includes('_')) { //proverka dali e najden
        showResult('Congratulations! You won! ');
        gameActive = false;
    } else if (triesLeft === 0) {
        showResult(`Game Over! :( The word was "${secretWord}"`);
        gameActive = false;
    }
    updateDisplay();

}

// Rezultat popup
function showResult(message) {
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('gamepopup').style.display = 'block';
}


function resetGame() {
    startGame();
}

// Dokolku e vnesena bukva -> proveri ja
document.getElementById('letterInput').addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    checkletter();
}
});


// Zapocni igrata koga se vkluchuva stranata
window.onload = startGame;