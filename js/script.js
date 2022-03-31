// The unordered list where the player’s guessed letters will appear.
const guessLetters = document.querySelector(".guessed-letters ul");
// The button with the text “Guess!” in it.
const button = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letter = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "Magnolia";
// create another global variable called guessedLetters with an empty array. This array will contain all the letters the player guesses.
const guessedLetters = [];

// Write a Function to Add Placeholders for Each Letter
// Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word.
const placeholderSymbol = function(word){
    const placeholderLetters = [];
    for (const letters of word){
        console.log(letters);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
// Call the function and pass it the word variable as the argument.
placeholderSymbol(word);

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
    console.log(playerGuess);
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
        message.innerText = "Try again. Please enter a letter."
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
        //console.log(guessedletters);
    }
};
