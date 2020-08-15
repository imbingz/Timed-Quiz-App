//Get and store the TIMER-WRAPPER DIV
const timerWrapper = document.querySelector('.timer-wrapper');
//Get and Store the minutes and seconds DISPLAY SPAN
let minutesDisplay = document.getElementById('minutesLeft');
let secondsDisplay = document.getElementById('secondsLeft');

// Get and store the HOME-WRAPPER DIV
const homeWrapper = document.querySelector('.home-wrapper');
//Get and store the START-BUTTON
const startBtn = document.querySelector('.start-btn');

// Add event handler to the START-BUTTON
startBtn.addEventListener('click', start);

// When START-BUTTON is clicked, TIMER starts to count down and questions with answer options will start
function start() {
	//Show Timer display
	timerWrapper.classList.remove('hide');
	//Hide Start-section
	homeWrapper.classList.add('hide');
	//Show Quiz-section
	quizWrapper.classList.remove('hide');

	startTimer();
	setAvailableQuestions();
	getNewQuestion();
}

/* TIMER - SECTION
----------------------------------------------------------------------------- */

// Set start tiime and total time varialbe
const startingTime = 1;
let totalTime = startingTime * 60;
let timerInterval;

function startTimer() {
	// Set timerupdate every second
	timerInterval = setInterval(timerCountdown, 1000);
	// Start TIMER function
	function timerCountdown() {
		//Clear interval when totalTime is 0
		if (totalTime <= 0) {
			clearInterval(timerInterval);
			quizOver();
		}
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
		// Timer countdown
		totalTime--;
	}
}

/* QUIZ-SECTION
----------------------------------------------------------------------------*/

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
let attempt = 0;
let correctAnswers = 0;

//Add quizzes from QUIZ ARRAY to AVAILABLEQUESTION ARRAY
function setAvailableQuestions() {
	// console.log('getAvailableQuestions running');
	for (let i = 0; i < quiz.length; i++) {
		// console.log(quiz[i]);
		availableQuestions.push(quiz[i]);
	}
	// console.log(availableQuestions);
}

//Get total question number, questions, and answer options
function getNewQuestion() {
	//Set questions number
	questionNumber.textContent = 'Question ' + (questionCounter + 1) + ' of ' + quiz.length;

	//Set question texts
	// Get random questions
	let randomQuesIndex = Math.floor(Math.random() * availableQuestions.length);
	const randomQuestion = availableQuestions[randomQuesIndex];
	// console.log(randomQuestion);
	// let currentQuestion be the randomly selected question
	currentQuestion = randomQuestion;
	// Add question text to HTML questions container
	questionText.textContent = randomQuestion.question;

	// Get the index of random quetsion and store it in a variable
	const index1 = availableQuestions.indexOf(randomQuestion);

	//Remove the 'randomQuestion' from the availableQuestion Array to avoid repeating
	availableQuestions.splice(index1, 1);
	// console.log(randomQuestion);
	// console.log(currentQuestion.option);

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

	questionCounter++;
}

// Get the result of current attempt question
function getResult(element) {
	// Set and option id (a string) from string to number
	const id = element.id;
	// check answer by comparing the id of clicked option
	if (id == currentQuestion.answer) {
		console.log('answer is correct');
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

		// if the answer is incorrect, then show the correct option by adding green color to the correct answer
		const optionLen = optionContainer.children.length;
		for (let i = 0; i < optionLen; i++) {
			// console.log(optionContainer.children[i].id);
			// console.log('current answer: ' + currentQuestion.answer);
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
	// console.log(markType);
	// Get each index of answer indicator and add a new class to them
	answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

// Add event handler for NEXT-BUTTON
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', next);

function next() {
	if (questionCounter === quiz.length) {
		console.log('Quiz Over');
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

	quizResult();
}

/* RESULT-SECTION
----------------------------------------------------------------------------*/

// Get and store the RESULT-WRAPPER DIV
const resultWrapper = document.querySelector('.result-wrapper');

window.onload = function() {
	setAvailableQuestions();
	getNewQuestion();
	answersIndicator();
};
