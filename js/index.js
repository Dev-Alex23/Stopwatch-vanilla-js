import {
  getFormattedTime,
  stopwatchData,
  compareLaps,
  lapData,
} from "./utils.js";

const $startButton = document.querySelector(".start-btn");
const $resetButton = document.querySelector(".reset-btn");
const $lapButton = document.querySelector(".lap-btn");
const $stopButton = document.querySelector(".stop-btn");
const $timeDisplay = document.querySelector(".time-display");

const updateTimer = () => {
  stopwatchData.currentLapElapsedTime++;
  stopwatchData.currentDisplayTime++;
  if (stopwatchData.currentLap === 1) {
    createRow();
  }
  stopwatchData.startTimerID = requestAnimationFrame(updateTimer);
  $timeDisplay.innerText = getFormattedTime(stopwatchData.currentDisplayTime);
  lapData.tableRowLapTime.innerText = getFormattedTime(
    stopwatchData.currentLapElapsedTime
  );
};

const startStopwatch = () => {
  stopwatchData.isStartTimer = true;
  requestAnimationFrame(updateTimer);
  if (stopwatchData.isStartTimer) {
    $startButton.style.display = "none";
    $stopButton.style.display = "block";
    $resetButton.style.display = "none";
    $lapButton.style.display = "block";
  }
};

const stopTimer = () => {
  cancelAnimationFrame(stopwatchData.startTimerID);
  stopwatchData.isStartTimer = false;

  if (!stopwatchData.isStartTimer) {
    $startButton.style.display = "block";
    $stopButton.style.display = "none";
    $resetButton.style.display = "block";
    $lapButton.style.display = "none";
  }
};

const resetTimer = () => {
  cancelAnimationFrame(stopwatchData.startTimerID);
  stopwatchData.currentLapElapsedTime = 0;
  stopwatchData.currentDisplayTime = 0;
  stopwatchData.isStartTimer = false;
  stopwatchData.startTimerID = 0;
  stopwatchData.currentLap = 1;
  stopwatchData.lapArray = [];
  $table.innerText = "";
  $resetButton.style.display = "none";
  $lapButton.style.display = "block";
  $timeDisplay.innerText = getFormattedTime(stopwatchData.currentDisplayTime);
};

const $table = document.querySelector("table");

const createRow = () => {
  lapData.tableRow = $table.insertRow(0);
  lapData.tableRowCurrentLap = lapData.tableRow.insertCell(
    0
  ).innerText = `Lap ${stopwatchData.currentLap++}`;
  lapData.tableRowLapTime = lapData.tableRow.insertCell(1);
  compareLaps();
  stopwatchData.currentLapElapsedTime = 0;
};

const lapSplitTime = () => {
  if (
    stopwatchData.currentLapElapsedTime === 0 ||
    !stopwatchData.isStartTimer
  ) {
    return;
  } else {
    stopwatchData.lapArray = [
      ...stopwatchData.lapArray,
      stopwatchData.currentLapElapsedTime,
    ];
    createRow();
  }
};

$startButton.onclick = startStopwatch;
$stopButton.onclick = stopTimer;
$resetButton.onclick = resetTimer;
$lapButton.onclick = lapSplitTime;
