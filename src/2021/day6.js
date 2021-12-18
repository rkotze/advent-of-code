const { readPuzzle } = require("../file-reader");

function puzzle1(days = 18) {
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
