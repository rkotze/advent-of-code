const { readPuzzle } = require("../file-reader");

function puzzle1(days) {
  const list = readPuzzle("2021", "day6.txt", (data) =>
    data.split(",").map((num) => Number(num))
  );

  for (let i = 0; i < days; i++) {
    const dayLength = list.length;
    for (let k = 0; k < dayLength; k++) {
      if (list[k] === 0) {
        list[k] = 6;
        list.push(8);
      } else {
        --list[k];
      }
    }
  }

  return list.length;
}

console.log(puzzle1(80));

function puzzle2(days) {
  const shoal = readPuzzle("2021", "day6.txt", (data) =>
    data.split(",").map((num) => Number(num))
  );

  const fishSpans = Array(9).fill(0);
  for (const age of shoal) {
    fishSpans[age]++;
  }

  for (let i = 0; i < days; i++) {
    let ageSix = 0;
    let ageEight = 0;
    for (let age = 0; age < fishSpans.length; age++) {
      let count = fishSpans[age];
      if (age === 0) {
        ageSix = count;
        ageEight = count;
      } else {
        fishSpans[age - 1] = count;
      }
    }

    fishSpans[6] += ageSix;
    fishSpans[8] = ageEight;
  }

  return fishSpans.reduce((acc, cur) => acc + cur, 0);
}

console.log(puzzle2(256));
