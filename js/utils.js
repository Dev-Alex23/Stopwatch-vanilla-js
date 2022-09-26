//nothing should be blocked in terms of variables

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

let shortestLap;
let longestLap;

export const compareLap = () => {
  longestLap = getFormattedTime(Math.max(...lapArray));
  shortestLap = getFormattedTime(Math.min(...lapArray));

  for (let i = 0, row; (row = table.rows[i + 1]); i++) {
    console.log(table.rows[i + 1]);
    for (let j = 0, col; (col = row.cells[j]); j++) {
      console.log(row.cells[1].innerText);
      if (currentlap >= 3 && shortestLap !== longestLap) {
        if (row.cells[1].innerText === longestLap) {
          col.classList.add("longest-lap");
        } else {
          col.classList.remove("longest-lap");
        }
        if (col.innerText === shortestLap) {
          col.classList.toggle("shortest-lap");
        } else {
          col.classList.toggle("shortest-lap");
        }
      }
    }
  }
};

// const compareLap = () => {
//   // lap Array has n elements
//   longestLap = getFormattedTime(Math.max(...lapArray)); // for loop
//   shortestLap = getFormattedTime(Math.min(...lapArray)); // for loop
//   console.log(lapArray[lapArray.length - 1]);

//   for (let i = 0, row; (row = table.rows[i + 1]); i++) {
//     for (let j = 0, col; (col = row.cells[j]); j++) {
//       if (currentlap >= 3 && shortestLap !== longestLap) {
//         if (col.innerText === longestLap) {
//           col.classList.add("longest-lap");
//         } else {
//           col.classList.remove("longest-lap");
//         }
//         if (col.innerText === shortestLap) {
//           col.classList.add("shortest-lap");
//         } else {
//           col.classList.remove("shortest-lap");
//         }
//       }
//     }
//   }
// };
