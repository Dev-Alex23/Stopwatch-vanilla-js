// Creating variables for each of the buttons
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const lapBtn = document.querySelector(".lap-btn");
const stopBtn = document.querySelector(".stop-btn");
const lapList = document.querySelector(".lap-time-list");

// save dom nodes with $

let displaySeconds = document.querySelector(".seconds");
let displayMinutes = document.querySelector(".minutes");
let displayMilliSeconds = document.querySelector(".milliSeconds");

let stopwatchInterval = 10;
// use object to have access to different grouped-variables
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let elaspedTime = 0;
let startStopToggle = false;
let startTimer;
let shortestLap;
let longestLap;
let currentlap = 1;
let lapArray = [];

// let lapInterval;

// creating timing function
const startStopwatch = () => {
  startStopToggle = true;
  startTimer = setInterval(() => {
    elaspedTime++;
    // console.log(elaspedTime + "ms");
    milliseconds++;
    if (milliseconds < 10) milliseconds = `${padTo2Digits(milliseconds)}`;
    displayMilliSeconds.innerHTML = milliseconds;

    if (milliseconds === 100) {
      milliseconds = 00;
      seconds++;
      if (seconds < 10) seconds = `${padTo2Digits(seconds)}`;
      displaySeconds.innerHTML = seconds;
    }

    if (seconds === 59 && milliseconds === 99) {
      seconds = 00;
      minutes++;
      if (minutes < 10) minutes = `${padTo2Digits(minutes)}`;
      displayMinutes.innerHTML = minutes;
    }
  }, stopwatchInterval);

  // conditional Buttons display
  if (startStopToggle) {
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    resetBtn.style.display = "none";
    lapBtn.style.display = "block";
  }

  lapBtn.style.backgroundColor = "var(--reset-btn-bg-color)";
};

//padding Functions
const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

// convertTime function
const convertMillisecondsToTime = (milliseconds) => {
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  let milliSeconds = milliseconds % 100;
  let seconds = Math.floor(milliseconds / 100);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (minutes < 60) {
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(
      milliSeconds
    )}`;
  } else {
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}.${padTo2Digits(milliSeconds)}`;
  }
};

// Stopping function
const stopTimer = () => {
  clearInterval(startTimer);
  startStopToggle = false;

  // conditional Button display
  if (!startStopToggle) {
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    resetBtn.style.display = "block";
    lapBtn.style.display = "none";
  }
};

// Reset function
const resetTimer = () => {
  clearInterval(startTimer);
  startStopToggle = false;
  lapArray = [];
  currentlap = 1;
  seconds = 0;
  minutes = 0;
  milliseconds = 0;
  displayMilliSeconds.innerHTML = "00";
  displaySeconds.innerHTML = "00";
  displayMinutes.innerHTML = "00";
  lapList.innerHTML = "";
  resetBtn.style.display = "none";
  lapBtn.style.display = "block";
};

// Lapping function
const lapSplitTime = () => {
  if (elaspedTime === 0) {
    return;
  } else {
    lapArray.push(elaspedTime);
    console.log(convertMillisecondsToTime(elaspedTime));
    lapList.innerHTML += `<li class="list-item"><p class="lap">Lap ${currentlap++}</p><p class="lap-time">${convertMillisecondsToTime(
      elaspedTime
    )}</p></li>`;
    elaspedTime = 0;
  }
};

// .0NCLICK

startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapSplitTime);
