const { readPuzzle } = require("../file-reader");

function uniqueSet(arrSet, totalUnique) {
  let count = 0;
  for (const testChar of arrSet) {
    const found = arrSet.join("").match(new RegExp(`${testChar}`, "g"));
    if (found.length === 1) {
      count += 1;
    }
  }
  return count === totalUnique;
}

function puzzle1() {
  const packets = readPuzzle("2022", "day6.txt", (data) => data.split(""));
  const traverse = 4;
  for (let i = 0; i < packets.length; i++) {
    const marker = packets.slice(i, i + traverse);
    if (uniqueSet(marker, traverse)) {
      return i + traverse;
    }
  }
  return 0;
}

console.log(puzzle1());

function puzzle2() {
  const packets = readPuzzle("2022", "day6.txt", (data) => data.split(""));
  const traverse = 14;
  for (let i = 0; i < packets.length; i++) {
    const marker = packets.slice(i, i + traverse);
    if (uniqueSet(marker, traverse)) {
      return i + traverse;
    }
  }
  return 0;
}

console.log(puzzle2());
