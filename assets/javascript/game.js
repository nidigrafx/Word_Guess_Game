$(document).ready(function() {

    var possibleWords = ["jedi", "jedi mind trick", "the force", "the dark side" , "nerfherder", "star wars", "carbonite", "stormtrooper", "droid", "padawan",
    "darth vader", "obi wan kenobi", "princess leia", "starfighter", "rebel alliance", "light side", "dark side", "clone wars", "jedi knight", 
"sith"]

    const maxGuess = 10
    var pauseGame = false

    var guessedLetters = []
    var guessingWord = []
    var wordToMatch
    var numGuess
    var wins = 0

    resetGame()

    
    document.onkeypress = function(event) {
        
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

   
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/sounds/martian-gun.mp3")
        incorrectSound.setAttribute("src","assets/sounds/sw4-lightsabre.mp3")

        
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                
                if (guessingWord.join("") === wordToMatch) {
                    
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                }
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            
            if (!guessedLetters.includes(letter)) {
                
                guessedLetters.push(letter)
                
                numGuess--
            }
            if (numGuess === 0) {
                
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        
        wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
        console.log(wordToMatch)

        
        guessedLetters = []
        guessingWord = []

        
        for (var i=0, j=wordToMatch.length; i < j; i++){
            
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})