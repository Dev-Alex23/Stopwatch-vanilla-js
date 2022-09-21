// Creating variables for each of the buttons
const $startButton = document.querySelector(".start-btn");
const $resetButton = document.querySelector(".reset-btn");
const $lapButton = document.querySelector(".lap-btn");
const $stopButton = document.querySelector(".stop-btn");
const lapList = document.querySelector(".lap-time-list");
const $timeDisplay = document.querySelector(".time-display");

// save dom nodes with $
// use object to have access to different grouped-variables

let stopwatchInterval = 10;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let elaspedTime = 0;
let currentDisplayTime = 0;
let isStartTimer = false;
let startTimerID;
// **************************//
let tableRow;
let tableRowCurrentLap;
let tableRowLapTime;
let currentTableRow = 1;

const startStopwatch = () => {
  isStartTimer = true;
  startTimerID = setInterval(() => {
    elaspedTime++;
    currentDisplayTime++;
    if (currentlap === 1) {
      tableRow = table.insertRow(0);
      tableRowCurrentLap = tableRow.insertCell(0);
      tableRowLapTime = tableRow.insertCell(1);
      tableRowCurrentLap.innerHTML = `Lap ${currentlap++}`;
    }
    $timeDisplay.innerHTML = getFormattedTime(currentDisplayTime);
    tableRowLapTime.innerHTML = getFormattedTime(elaspedTime);
  }, stopwatchInterval);

  // conditional Buttons display
  if (isStartTimer) {
    $startButton.style.display = "none";
    $stopButton.style.display = "block";
    $resetButton.style.display = "none";
    $lapButton.style.display = "block";
  }

  $lapButton.style.backgroundColor = "var(--reset-btn-bg-color)";
};

//padding Functions
const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

// convertTime function
const getFormattedTime = (duration) => {
  milliseconds = duration % 100;
  seconds = Math.floor(duration / 100);
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (minutes < 60) {
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(
      milliseconds
    )}`;
  } else {
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}.${padTo2Digits(milliseconds)}`;
  }
};

// Stopping function
const stopTimer = () => {
  clearInterval(startTimerID);
  isStartTimer = false;

  // conditional Button display
  if (!isStartTimer) {
    $startButton.style.display = "block";
    $stopButton.style.display = "none";
    $resetButton.style.display = "block";
    $lapButton.style.display = "none";
  }
};

// Reset function
const resetTimer = () => {
  clearInterval(startTimerID);
  isStartTimer = false;
  lapArray = [];
  currentlap = 1;
  seconds = 0;
  minutes = 0;
  milliseconds = 0;
  currentDisplayTime = 0;
  elaspedTime = 0;
  table.innerHTML = "";
  $timeDisplay.innerHTML = getFormattedTime(currentDisplayTime);
  $resetButton.style.display = "none";
  $lapButton.style.display = "block";
};

let shortestLap;
let longestLap;
let currentlap = 1;
let lapArray = [];
let table = document.querySelector("table");

const createRow = (num) => {
  tableRow = table.insertRow(0);
  tableRowCurrentLap = tableRow.insertCell(0);
  tableRowLapTime = tableRow.insertCell(1);

  tableRowCurrentLap.innerHTML = `Lap ${currentlap++}`;
  tableRowLapTime.innerHTML = `${getFormattedTime(num)}`;
  elaspedTime = 0;
};

const compareLap = () => {
  longestLap = getFormattedTime(Math.max(...lapArray));
  shortestLap = getFormattedTime(Math.min(...lapArray));

  for (let i = 0, row; (row = table.rows[i + 1]); i++) {
    for (let j = 0, col; (col = row.cells[j]); j++) {
      if (currentlap >= 3 && shortestLap !== longestLap) {
        if (col.innerText === longestLap) {
          col.classList.add("longest-lap");
        } else {
          col.classList.remove("longest-lap");
        }
        if (col.innerText === shortestLap) {
          col.classList.add("shortest-lap");
        } else {
          col.classList.remove("shortest-lap");
        }
      }
    }
  }
};

const lapSplitTime = () => {
  if (elaspedTime === 0 && !isStartTimer) {
    return;
  } else {
    lapArray.push(elaspedTime);
    createRow(elaspedTime);
    compareLap();
  }
};

// .0NCLICK

$startButton.addEventListener("click", startStopwatch);
$stopButton.addEventListener("click", stopTimer);
$resetButton.addEventListener("click", resetTimer);
$lapButton.addEventListener("click", lapSplitTime);
