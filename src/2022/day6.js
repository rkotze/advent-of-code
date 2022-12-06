const { readPuzzle } = require("../file-reader");

function uniqueSet(arrSet) {
  let count = 0;
  for (const testChar of arrSet) {
    const found = arrSet.join("").match(new RegExp(`${testChar}`, "g"));
    if (found.length === 1) {
      count += 1;
    }
  }
  return count === 4;
}

function puzzle1() {
  const packets = readPuzzle("2022", "day6.txt", (data) => data.split(""));
  const traverse = 4;
  for (let i = 0; i < packets.length; i++) {
    const marker = packets.slice(i, i + traverse);
    // console.log("🚀 ~ marker", marker);
    if (uniqueSet(marker)) {
      return i + traverse;
    }
  }
  return 0;
}

console.log(puzzle1());
