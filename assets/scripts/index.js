//Get and store the START-BUTTON
const startBtn = document.querySelector('.start-btn');

//Get and store the TIMER-Wrapper DIV
const timerWrapper = document.querySelector('.timer-wrapper');

let minutesDisplay = document.getElementById('minutesLeft');

let secondsDisplay = document.getElementById('secondsLeft');

// Add event handler to the START-BUTTON
startBtn.addEventListener('click', start);

// When START-BUTTON is clicked, TIMER starts to count down and questions with answer options will start
function start() {
	startTimer();
}

// TIMER
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
