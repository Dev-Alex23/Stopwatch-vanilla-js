import { getFormattedTime } from "./utils.js";

const $startButton = document.querySelector(".start-btn");
const $resetButton = document.querySelector(".reset-btn");
const $lapButton = document.querySelector(".lap-btn");
const $stopButton = document.querySelector(".stop-btn");
const $timeDisplay = document.querySelector(".time-display");

let currentLapElapsedTime = 0;
let currentDisplayTime = 0;
let isStartTimer = false;
let startTimerID;
let currentLap = 1;
let lapArray = [];

const updateTimer = () => {
  currentLapElapsedTime++;
  currentDisplayTime++;
  if (currentLap === 1) {
    createRow(currentLapElapsedTime);
  }
  startTimerID = setTimeout(updateTimer, 10);
  $timeDisplay.innerText = getFormattedTime(currentDisplayTime);
  tableRowLapTime.innerText = getFormattedTime(currentLapElapsedTime);
};

// schedule a timeout to be triggered after 50 ms
// run this code when it is triggered
// after running the code schedule the same code to run again after 50ms
const startStopwatch = () => {
  isStartTimer = true;
  startTimerID = setTimeout(updateTimer, 10);

  // conditional Buttons display
  if (isStartTimer) {
    $startButton.style.display = "none";
    $stopButton.style.display = "block";
    $resetButton.style.display = "none";
    $lapButton.style.display = "block";
  }

  $lapButton.style.backgroundColor = "var(--reset-btn-bg-color)";
};

// Stopping function
const stopTimer = () => {
  clearTimeout(startTimerID);
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
  currentLap = 1;
  shortestLap = Infinity;
  longestLap = -1;
  currentDisplayTime = 0;
  $table.innerText = "";
  $resetButton.style.display = "none";
  $lapButton.style.display = "block";
  $timeDisplay.innerText = getFormattedTime(currentDisplayTime);
};

const $table = document.querySelector("table");
const $tableBody = $table.getElementsByTagName("tbody");
const getAllTableRow = document.getElementsByTagName("table")[0].rows;

let shortestLap = Infinity;
let longestLap = -1;
let tableRow;
let tableRowCurrentLap;
let tableRowLapTime;

const createRow = () => {
  tableRow = $table.insertRow(0);
  tableRowCurrentLap = tableRow.insertCell(0);
  tableRowLapTime = tableRow.insertCell(1);
  tableRowLapTime.innerText = currentLapElapsedTime;
  tableRowCurrentLap.innerText = `Lap ${currentLap++}`;

  // find the old longest lap and update its class
  // if (num) tableRow.classList;

  if (lapArray.length === 2) {
    if (currentLapElapsedTime > lapArray[0]) {
      longestLap = lapArray[1];
      shortestLap = lapArray[0];
      getAllTableRow[1].classList.add("longest-lap");
      getAllTableRow[2].classList.add("shortest-lap");
    } else {
      longestLap = lapArray[0];
      shortestLap = lapArray[1];
      getAllTableRow[2].classList.add("longest-lap");
      getAllTableRow[1].classList.add("shortest-lap");
    }
  }

  if (lapArray.length >= 3) {
    if (longestLap < currentLapElapsedTime) {
      longestLap = currentLapElapsedTime;
      getAllTableRow[1].classList.add("longest-lap");
      console.log("Longest Lap", longestLap);
      let removeOldLongestLap = document.getElementsByClassName("longest-lap");
      removeOldLongestLap[1].classList.remove("longest-lap");
    }
    if (currentLapElapsedTime < shortestLap) {
      shortestLap = currentLapElapsedTime;
      getAllTableRow[1].classList.add("shortest-lap");
      let removeOldShortestLap =
        document.getElementsByClassName("shortest-lap");
      removeOldShortestLap[1].classList.remove("shortest-lap");
    }
  }
  currentLapElapsedTime = 0;
};

const lapSplitTime = () => {
  if (currentLapElapsedTime === 0 && !isStartTimer) {
    return;
  } else {
    lapArray.push(currentLapElapsedTime);
    createRow(currentLapElapsedTime);
    console.log(getAllTableRow);
  }
};

$startButton.onclick = startStopwatch;
$stopButton.onclick = stopTimer;
$resetButton.onclick = resetTimer;
$lapButton.onclick = lapSplitTime;
