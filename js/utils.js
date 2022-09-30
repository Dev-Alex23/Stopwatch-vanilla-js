let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

// convertTime function
export const getFormattedTime = (duration) => {
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

export const stopwatchData = {
  currentLapElapsedTime: 0,
  currentDisplayTime: 0,
  isStartTimer: false,
  startTimerID: 0,
  currentLap: 1,
  lapArray: [],
};
export const lapData = {
  shortestLap: Infinity,
  longestLap: -1,
  tableRow: null,
  tableRowLapTime: null,
  tableRowCurrentLap: null,
};

const $getAllTableRow = document.getElementsByTagName("table")[0].rows;

const checkFirstLap = () => {
  if (stopwatchData.lapArray.length === 2) {
    if (stopwatchData.currentLapElapsedTime > stopwatchData.lapArray[0]) {
      lapData.longestLap = stopwatchData.lapArray[1];
      lapData.shortestLap = stopwatchData.lapArray[0];
      $getAllTableRow[1].classList.add("longest-lap");
      $getAllTableRow[2].classList.add("shortest-lap");
    } else {
      lapData.longestLap = stopwatchData.lapArray[0];
      lapData.shortestLap = stopwatchData.lapArray[1];
      $getAllTableRow[2].classList.add("longest-lap");
      $getAllTableRow[1].classList.add("shortest-lap");
    }
  }
};

export const compareLaps = () => {
  checkFirstLap();

  if (stopwatchData.lapArray.length >= 3) {
    if (lapData.longestLap < stopwatchData.currentLapElapsedTime) {
      lapData.longestLap = stopwatchData.currentLapElapsedTime;
      $getAllTableRow[1].classList.add("longest-lap");
      let removeOldLongestLap = document.getElementsByClassName("longest-lap");
      removeOldLongestLap[1].classList.remove("longest-lap");
    }
    if (stopwatchData.currentLapElapsedTime < lapData.shortestLap) {
      lapData.shortestLap = stopwatchData.currentLapElapsedTime;
      $getAllTableRow[1].classList.add("shortest-lap");
      let removeOldShortestLap =
        document.getElementsByClassName("shortest-lap");
      removeOldShortestLap[1].classList.remove("shortest-lap");
    }
  }
};
