// The unordered list where the player’s guessed letters will appear.
const lettersGuessed = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const button = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letter = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuessesInput = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

let word = "Magnolia";
// create another global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses.
let guessedLetters = [];
let remainingGuesses = 5;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    //transform the data you fetched into an array
    const wordArray = data.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    //console.log(wordArray);
    placeholderSymbol(word);
};

getWord();

// Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word.
const placeholderSymbol = function(word){
    const placeholderLetters = [];
    for (const letters of word){
        console.log(letters);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// Add an event listener for when a player clicks the Guess button. In the callback function, add a parameter for the event: e.
button.addEventListener("click", function(e) {
    //To prevent this reloading behavior, add this line of code at the top of the callback function: e.preventDefault();
    e.preventDefault();
    //Create and name a variable to capture the value of the input. 
    const guess = letter.value;
    //Log out the value of the variable capturing the input.
    console.log(guess);
    // empty text of the message element
    message.innerText = ""; 
    // making sure the guess is a single letter
    const playerGuess = playerInput(guess);
    if (playerGuess){
        makeGuess(guess);
    };
    //empty the value of the input. You should see the letter you enter into the input field in the console when the Guess button is clicked. 
    letter.value = "";
    //console.log(playerGuess);
});

// Create and name a function that accepts the input value as a parameter. This function’s purpose is to validate the player’s input.
const playerInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    // check if the input is empty
    if(input.length === 0){
        message.innerText = "Try again. Please enter a letter";
    } 
    // check if the player has entered more than one letter
    else if (input.length > 1) {
        message.innerText = "Try again. Please enter only one letter"
    }
    // check if they’ve entered a character that doesn’t match the regular expression pattern
        else if (!input.match(acceptedLetter)) {
        message.innerText = "Try again. Please enter a letter from A to Z."
    } else {
        return input;
    }
};

//create a new function called makeGuess that accepts a letter as the parameter
const makeGuess = function(guess){
    //converting your letter parameter to uppercase
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Try again. You've already guessed that letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        //Call the function inside the else statement of the makeGuess function so the letter displays when it hasn’t been guessed before.
        countGuessesRemaining(guess);
        showGuessedLetters();
        updatedGuessedLetters(guessedLetters);
    }
};

// Create and name a function to update the page with the letters the player guesses 
const showGuessedLetters = function(){
    //Empty the innerHTML of the unordered list where the player’s guessed letters will display.
    lettersGuessed.innerHTML = "";
    //Create a new list item for each letter inside your guessedLetters array (i.e., the global variable) and add it to the unordered list.
    for (const letterInput of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letterInput;
        lettersGuessed.append(li);
    }
};

// Create and name a function to update the word in progress that accepts the guessedLetters array as a parameter
const updatedGuessedLetters = function(guessedLetters){
    //Create a variable called wordUpper to change the word variable to uppercase.
    const wordUpper = word.toUpperCase();
    //On the following line, create a variable to split the word string into an array so that the letter can appear in the guessedLetters array: const wordArray = wordUpper.split("");
    const wordArray = wordUpper.split("");
    //You’ll want to create a new array with the updated characters and then use join() to update the empty paragraph where the word in progress will appear.
    const updatedLetters = [];
    //log out wordArray
    console.log(wordArray);
    //Check if the wordArray contains any letters from the guessedLetters array. If it does contain any of the letters, update the circle symbol with the correct letter.
    for(const letterInput of wordArray) {
        if (guessedLetters.includes(letterInput)) {
            updatedLetters.push(letterInput.toUpperCase());
        } else {
            updatedLetters.push("●");
        }
    }
    wordInProgress.innerText = updatedLetters.join("");
    checkPlayerWin();
};

//Create and name a new function that will accept the guess input as a parameter. In the code, place this function before the function that checks if the player won.
const countGuessesRemaining = function(guess){
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = `Try again. ${guess} is not in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! ${guess} is in the word!`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The correct word is ${word}.`;
        startOver();
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Create and name a function to check if the player successfully guessed the word and won the game
const checkPlayerWin = function(){
    //Begin by verifying if their word in progress matches the word they should guess
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    }
};

// create a function to hide elements, like the Guess button, when the game ends. You’ll also use the function to show the Play Again button.
const startOver = function () {
    button.classList.add("hide");
    remainingGuessesInput.classList.add("hide");
    lettersGuessed.classList.add("hide");
    playAgainButton.classList.remove("hide");
};
// write a click event for the Play Again button to display a new word and restart the guesses back to 8
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 5;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    lettersGuessed.innerHTML = "";
    message.innerText = "";

    button.classList.remove("hide");
    remainingGuessesInput.classList.remove("hide");
    lettersGuessed.classList.remove("hide");
    playAgainButton.classList.add("hide");
    
    getWord();
});