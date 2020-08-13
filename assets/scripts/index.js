//Get and store the TIMER-WRAPPER DIV
const timerWrapper = document.querySelector('.timer-wrapper');
//Get and Store the minutes and seconds DISPLAY SPAN
let minutesDisplay = document.getElementById('minutesLeft');
let secondsDisplay = document.getElementById('secondsLeft');

// Get and store the START-SECTION-WRAPPER DIV
const startSectionWrapper = document.querySelector('.start-section');
//Get and store the START-BUTTON
const startBtn = document.querySelector('.start-btn');





// Add event handler to the START-BUTTON
startBtn.addEventListener('click', start);

// When START-BUTTON is clicked, TIMER starts to count down and questions with answer options will start
function start() {
  //Show Timer display
  timerWrapper.classList.remove('hide');
  //Hide Start-section
  startSectionWrapper.classList.add('hide');
  startTimer();
}


// TIMER-SECTION
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

// QUIZ-SECTION

// Get and store the QUIZ-SECTION elements 
const quizWrapper = document.querySelector('.quiz-wrapper');
const questionNumber = document.querySelector('.question-number');
const qquestionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answers-indicator');

// Set variables for QUIZ-SECTION
let questionCounter = 0;
let availableQuestions = [];

let attemp = 0;
let correctAnswer = 0;
let currentQuestion;

let availableOptions = [];


//Add quizzes from quiz bank to avaialbeQuestion Array




