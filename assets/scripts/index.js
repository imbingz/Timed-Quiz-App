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
	//Show Quiz-sedtion
	quizWrapper.classList.remove('hide');

	startTimer();
	getAvailableQuestions();
	getNewQuestions();
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
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answers-indicator');

// Set variables for QUIZ-SECTION
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion;
let availableOptions = [];
let attemp = 0;
let correctAnswer = 0;

//Add quizzes from QUIZ ARRAY to AVAILABLEQUESTION ARRAY
function getAvailableQuestions() {
	// console.log('getAvailableQuestions running');
	for (let i = 0; i < quiz.length; i++) {
		// console.log(quiz[i]);
		availableQuestions.push(quiz[i]);
	}
	// console.log(availableQuestions);
}

//Get total question number, questions, and answer options
function getNewQuestions() {
	totalQuestionNumber();
	questionDisplay();
	optionDisplay();
	next()
}

//Display total question number
function totalQuestionNumber() {
	// console.log('totalQuestionNumber running');
	questionNumber.textContent = 'Question ' + (questionCounter + 1) + ' of ' + quiz.length;
	// console.log(questionNumber);
}

//Display randomly picked questions from QUIZ ARRAY
function questionDisplay() {
	// console.log('questionDisplay running');
	//Get random questions
	let randomQuesIndex = Math.floor(Math.random() * quiz.length);
	const randomQuestion = availableQuestions[randomQuesIndex];
	// console.log(randomQuestion);
	//Let currentQuestion = randomQuestion
	currentQuestion = randomQuestion;
	//Add question to QUESTION-TEXT
	questionText.textContent = currentQuestion.question;
}

//Display answer options in random order
function optionDisplay() {
	console.log('optionDisplay running');
	//Get answer option length
	const optionLen = currentQuestion.option.length;
	console.log(optionLen);
	console.log(currentQuestion.option);
	//Add option index to availableOptions ARRAY
	for (let i = 0; i < optionLen; i++) {
		availableOptions.push(i);
	}
	console.log(availableOptions);

 //Display options in OPTION-CONTAINER
  for (let i = 0; i < optionLen; i++) {
    //Radom options
		const randomOptionIndex = Math.floor(Math.random() * availableOptions.length)
		

		//create a NEW P TAG that holds question options under OPTION CONTAINNER 
		const option = document.createElement('p')
		//Loop through each option and display options on HTML
		option.textContent = currentQuestion.option[randomOptionIndex];
		//Add each option p as child element of the option-container div
		optionContainer.appendChild(option);
	}

	//Adding number to questionCounter each time
	questionCounter++;
}

//Add event handler on the NEXT button 
const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', next)
function next() {
	//check if all questions have answered, if so, dispaly quiz over 
	if (questionCounter === quiz.length) {
		console.log('quiz over');

	} else {
		getNewQuestions();
	}

};
