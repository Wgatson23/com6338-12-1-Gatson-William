const words = [
	"bananas",
	"grapes",
	"carousel",
	"milkshake",
	"javascript",
	"limousine",
	"chocolate",
	"programming",
	"meatloaf",
	"ukulele",
	"mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
	constructor(word) {
		this.word = word;
		this.displayWord = "_".repeat(word.length);
		this.remainingGuesses = 10;
		this.incorrectLetters = [];
		this.correctLetters = [];
	}

	guessLetter(letter) {
		if (this.word.includes(letter)) {
			this.correctLetters.push(letter);
			this.displayWord = this.word
				.split("")
				.map((char) => (this.correctLetters.includes(char) ? char : "_"))
				.join("");
		} else {
			this.remainingGuesses--;
			this.incorrectLetters.push(letter);
		}
	}

	updateScreen() {
		document.getElementById("remaining-guesses").textContent =
			this.remainingGuesses;
		document.getElementById("incorrect-letters").textContent =
			this.incorrectLetters;
		document.getElementById("word-to-guess").textContent = this.displayWord;
	}

	isGameOver() {
		return this.remainingGuesses <= 0 || this.word === this.displayWord;
	}

	getWinOrLoss() {
		return this.word === this.displayWord && this.remainingGuesses > 0
			? "win"
			: this.word !== this.displayWord && this.remainingGuesses <= 0
			? "loss"
			: null;
	}
}

function newGame() {
	const randomWord = words[Math.floor(Math.random() * words.length)];
	currentWord = new Word(randomWord);
	currentWord.updateScreen();
}

document.onkeyup = function (e) {
	const pressedKey = e.key.toLowerCase();
	if (!/^[a-z]$/g.test(pressedKey)) return;

	currentWord.guessLetter(pressedKey);
	currentWord.updateScreen();

	if (currentWord.isGameOver()) {
		const previousWord = document.getElementById("previous-word");
		const winDisplay = document.getElementById("wins");
		const lossDisplay = document.getElementById("losses");
		previousWord.textContent = currentWord.word;
		const result = currentWord.getWinOrLoss();
		if (result === "win") {
			wins++;
			winDisplay.textContent = wins;
		} else if (result === "loss") {
			losses++;
			lossDisplay.textContent = losses;
		}
		newGame();
	}
};

newGame();
