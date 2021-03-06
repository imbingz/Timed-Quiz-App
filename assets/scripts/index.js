/* STAR TO PLAY
----------------------------------------------------------------------------- */
// Get and store the HOME-WRAPPER DIV
const homeWrapper = document.querySelector('.home-wrapper');

//Get and store the START-BUTTON
const startBtn = document.querySelector('.start-btn');

//Get and store the TIMER-WRAPPER DIV
const timerWrapper = document.querySelector('.timer-wrapper');
//Get and Store the minutes and seconds DISPLAY SPAN
let minutesDisplay = document.getElementById('minutesLeft');
let secondsDisplay = document.getElementById('secondsLeft');

// Set start time and total time varialbe
let startingTime = 1;
let totalTime;
let subtractTimePenalty = 5;
let timerInterval;

// Get and store the QUIZ-SECTION elements
const quizWrapper = document.querySelector('.quiz-wrapper');
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answers-indicator');

// Set variables for QUIZ-SECTION
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion;
let availableOptions = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
let gameActive = true;

/* START-BUTTON
----------------------------------------------------------------------------- */

// Add event handler to the START-BUTTON
startBtn.addEventListener('click', startQuiz);

// When START-BUTTON is clicked, TIMER starts to count down and questions with answer options will start
function startQuiz() {
	//Hide Start-section
	homeWrapper.classList.add('hide');
	//Show Timer display
	timerWrapper.classList.remove('hide');
	//Show Quiz-section
	quizWrapper.classList.remove('hide');
	//Set gameActive
	gameActive = true;
	//First set all questions in availableQuestion Array
	setAvailableQuestions();
	// Also start TIMER
	startTimer();
	//Then call to get each new question
	getNewQuestion();
	// Then create indicator of the answers
	answersIndicator();
}

/* TIMER - SECTION
----------------------------------------------------------------------------- */

function setTime(seconds) {
	totalTime = seconds;

	// Set timerMinutes and timerSeconds
	let timerMinutes = Math.floor(totalTime / 60);
	let timerSeconds = totalTime % 60;

	//Format timerMinutes and timerSeconds
	timerMinutes = timerMinutes < 0 ? '00' + timerMinutes : timerMinutes;
	timerMinutes = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes;
	timerSeconds = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds;

	// Add the timerMinutes and timerSeconds to timerDisplay
	minutesDisplay.textContent = timerMinutes;
	secondsDisplay.textContent = timerSeconds;
}

function startTimer() {
	setTime(startingTime * 60);

	// Set timerupdate every second
	timerInterval = setInterval(timerCountdown, 1000);
	// Start TIMER function
	function timerCountdown() {
		//Clear interval when totalTime is 0
		if (totalTime <= 0 || !gameActive) {
			clearInterval(timerInterval);
			quizOver();
		}
		// Timer countdown
		setTime(totalTime - 1);
	}
}

// Clear TIMER
function clearTimer() {
	clearInterval(timerInterval);
}

/* QUIZ-SECTION
----------------------------------------------------------------------------*/

//Add quizzes from QUIZ ARRAY to AVAILABLEQUESTION ARRAY
function setAvailableQuestions() {
	for (let i = 0; i < quiz.length; i++) {
		availableQuestions.push(quiz[i]);
	}
}

//Get total question number, questions, and answer options
function getNewQuestion() {
	//Set questions number
	questionNumber.textContent = 'Question ' + (questionCounter + 1) + ' of ' + quiz.length;

	//Set QUESTION TEXT

	// Get random questions
	let randomQuesIndex = Math.floor(Math.random() * availableQuestions.length);
	const randomQuestion = availableQuestions[randomQuesIndex];

	// let currentQuestion be the randomly selected question
	currentQuestion = randomQuestion;
	// Add question text to HTML questions container
	questionText.textContent = randomQuestion.question;
	// Get the index of random quetsion and store it in a variable
	const index1 = availableQuestions.indexOf(randomQuestion);

	//Remove the 'randomQuestion' from the availableQuestion Array to avoid repeating
	availableQuestions.splice(index1, 1);

	//Set OPTIONS

	//Get the length of options
	const optionLen = currentQuestion.option.length;
	// push options to availableOptions array
	for (let i = 0; i < optionLen; i++) {
		availableOptions.push(i);
	}

	//Reset the optionContainer when the NEXT button is clicked
	optionContainer.textContent = '';

	// Set animation for P tags behavior
	let animatoinDelay = 0.18;

	//Display options on HTML
	for (let i = 0; i < optionLen; i++) {
		// Radom option
		const randomOptIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		// get the position of randomOptIndex from avaialbeOptions Array
		const index2 = availableOptions.indexOf(randomOptIndex);
		// remove the index2 from the availableOptions Array to avoid repeating
		availableOptions.splice(index2, 1);

		// create NEW p tags that hold question options under option container
		const option = document.createElement('p');
		option.textContent = currentQuestion.option[randomOptIndex];
		// Set 	NEW id for the answer indicator later
		option.id = randomOptIndex;
		//Add ANIMATION
		option.style.animatoinDelay = animatoinDelay + 's';
		animatoinDelay = animatoinDelay + 0.18;
		//Add NEW class name
		option.className = 'option';
		//add eeach option p as child element of the option-container div
		optionContainer.appendChild(option);
		option.setAttribute('onclick', 'getResult(this)');
	}
	//Adding number to questionCounter each time
	questionCounter++;
}

// Get the result of current attempt question
function getResult(element) {
	// Set and option id (a string) from string to number
	const id = element.id;
	// check answer by comparing the id of clicked option
	if (id == currentQuestion.answer) {
		// Set the GREEN color for the correct answer
		element.classList.add('correct');
		// Add indicator to correct mark
		updateAnswerIndicator('correct');
		//Count CORRECT ANSWERS
		correctAnswers++;
	} else {
		// Set ORANGE color for incorrect answer
		element.classList.add('incorrect');
		// Add indicator to incorrect mark
		updateAnswerIndicator('incorrect');

		incorrectAnswers++;
		setTime(totalTime - subtractTimePenalty);

		// if the answer is incorrect, then show the correct option by adding green color to the correct answer
		const optionLen = optionContainer.children.length;
		for (let i = 0; i < optionLen; i++) {
			if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
				optionContainer.children[i].classList.add('correct');
			}
		}
	}
	unclickableOptions();
}

// // RESTRICT USERS TO CHANGE OPTION (Make all the option unclickable once the user has selected an option)
function unclickableOptions() {
	const optionLen = optionContainer.children.length;
	for (let i = 0; i < optionLen; i++) {
		optionContainer.children[i].classList.add('already-answered');
	}
}

// Add ANSWER INDICATOR for question answers
function answersIndicator() {
	answersIndicatorContainer.textContent = '';
	const totalQuestion = quiz.length;
	for (let i = 0; i < totalQuestion; i++) {
		const indicator = document.createElement('div');
		answersIndicatorContainer.appendChild(indicator);
	}
}

// Check question answer type - CORRECT or INCORRECT
function updateAnswerIndicator(markType) {
	// Get each index of answer indicator and add a new class to them
	answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

// Add event handler for NEXT-BUTTON
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', next);

function next() {
	if (questionCounter === quiz.length) {
		quizOver();
	} else {
		getNewQuestion();
	}
}

//Show QUIZ RESULT when quiz over
function quizOver() {
	//Hide TIME-WRAPPER
	timerWrapper.classList.add('hide');
	// Hide QUIZ-WRAPPER
	quizWrapper.classList.add('hide');
	// Show RESULT-WRAPPER
	resultWrapper.classList.remove('hide');
	saveBtn.classList.remove("hide");
	gameActive = false;

	clearTimer();

	// Calculate QUIZ RESULT
	currentScore = correctAnswers * 10;
	currentScoreDisplay.textContent = currentScore;

	//Save the most recent score to localStorage
	localStorage.setItem('currentSocre', currentScore);

	//Check wheather there is a highScore a localStorage
	highScores = localStorage.getItem('highScores') || [];

	//Display currentScore
	currentScoreDisplay.textContent = currentScore;
	
	

}

/* RESULT-SECTION
----------------------------------------------------------------------------*/

// Get and store the elemtns for RESULT-SECTION
const resultWrapper = document.querySelector('.result-wrapper');
const  saveBtn = document.querySelector('.save-btn');
const  tryAgainBtn = document.querySelector('.try-again');
const  backHomeBtn = document.querySelector('.back-home');
let initialsInput = document.getElementById('initials');
let currentScoreDisplay = document.getElementById("current-score")
let highScoresDisplay = document.getElementById('high-scores')



//Set global virables for RESULT-SECTION
let currentScore;
let highScores;
let initials;

//Get currentScore from localStorage
currentScore = localStorage.getItem('currentScore');

//Get highScores from localStorage
highScores = JSON.parse(localStorage.getItem('highScores'));

//Add event listener to SAVE-BUTTON
saveBtn.addEventListener('click', function(event) {
	//Prevent subnmit button default behavior
	event.preventDefault();

	// Get USER INPUT VALUE
	initials = initialsInput.value.trim();

	//Check whether there is USER INPUT
	if (!initials) return;

	// Set the object score
	const score = {
		initials: initials,
		score: currentScore
	}

	//Check the greater score
	if (highScores && score.score > highScores) {
		localStorage.setItem('highScores', socre);
	} else if (!highScores) localStorage.setItem('highScores', score)


	//Display highScores
	highScoresDisplay.textContent = score.initials + " , " + score.score

	//Update localStorage 
	localStorage.setItem("highScores", JSON.stringify(highScores));

	saveBtn.classList.add("hide");
});

/* RESET QUIZ
--------------------------------------------------------------------------------------------------------------------*/

// Reset quiz
function resetQuiz() {
	questionCounter = 0;
	correctAnswers = 0;
	incorrectAnswers = 0;
	clearTimer();
	gameActive = true;
}

// Add event handler for try-again button - hide result-box, show quiz-box

tryAgainBtn.addEventListener('click', tryAgain);

function tryAgain() {
	//hide the result-box
	resultWrapper.classList.add('hide');
	//Show Timer display
	timerWrapper.classList.remove('hide');
	// show quiz-box
	quizWrapper.classList.remove('hide');
	// reset quiz
	resetQuiz();
	startQuiz();
}

// Add event handler for back-home button - hide result-box and show home-box
backHomeBtn.addEventListener('click', backHome);

function backHome() {
	//hide the RESULT-WRAPPER
	resultWrapper.classList.add('hide');
	// show HOMEWRAPPER
	homeWrapper.classList.remove('hide');
	// reset quiz
	resetQuiz();
}

//
window.onload = function() {
	const totalQuestionText = homeWrapper.querySelector('.total-number');
};
