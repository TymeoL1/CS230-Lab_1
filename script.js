const totalTime = 25 * 60;
let timeLeft = totalTime;
let timerInterval = null;
let isPaused = false;

const timeDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60;
  timeDisplay.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  if (timeLeft < 60) {
    timeDisplay.classList.add("below-minute");
  } else {
    timeDisplay.classList.remove("below-minute");
  }
}
  // if(timeLeft < 60){
  //     timeDisplay.style.color = 'red';
  //     timeDisplay.style.borderRadius = '5px';
  //     timeDisplay.style.backgroundColor = 'black';
  //     timeDisplay.style.border = '5px solid gray';
  // } else {
  //     timeDisplay.style.color = 'black';
  //     timeDisplay.style.borderRadius = '0';
  //     timeDisplay.style.border = 'none';
  // }

function startTimer() {
  if (timerInterval) {
    return;
  }
  timerInterval = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Time is up, take a break!');
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = totalTime;
  isPaused = false;
  pauseButton.textContent = 'Pause';
  updateDisplay();
}

function togglePause() {
  if (!timerInterval) {
    return;
  }
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = 'Resume';
  } else {
    pauseButton.textContent = 'Pause';
  }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', togglePause);

updateDisplay();