// The unordered list where the player’s guessed letters will appear.
const guestLetters = document.querySelector(".guessed-letters ul");
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

// Create and name a function to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step). Hint: Copy and paste the ● symbol into your code!
const placeholderSymbol = function(word){
    const placeholderLetters = [];
    for(const letters of word){
        console.log(letters);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholderSymbol(word);

// Add an event listener for when a player clicks the Guess button. In the callback function, add a parameter for the event: e.
button.addEventListener("click", function(e){
    e.preventDefault();
    //Create and name a variable to capture the value of the input. Log out the value of the variable capturing the input. Then, empty the value of the input. You should see the letter you enter into the input field in the console when the Guess button is clicked. 
    const capturedInput = letter.value; 
    console.log(capturedInput);
    letter.value = "";
});


