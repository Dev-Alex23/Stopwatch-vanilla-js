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
