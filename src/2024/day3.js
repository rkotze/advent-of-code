const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2024", "day3.txt");
  let total = 0;
  for (const str of data) {
    const numList = Array.from(
      str.matchAll(/mul\(([\d]{1,3},[\d]{1,3})\)/g),
      (match) => {
        const nums = match[1].split(",").map(Number);
        return nums[0] * nums[1];
      }
    );
    total += numList.reduce((acc, num) => acc + num, 0);
  }
  return total;
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2024", "day3.txt", (data) =>
    data.replace(/(\r\n|\n|\r)/gm, "")
  );
  const filtered = data
    .split("do()")
    .map((str) => str.split("don't()")[0])
    .join("");

  const numList = Array.from(
    filtered.matchAll(/mul\(([\d]{1,3},[\d]{1,3})\)/g),
    (match) => {
      const nums = match[1].split(",").map(Number);
      return nums[0] * nums[1];
    }
  );
  return numList.reduce((acc, num) => acc + num, 0);
}

console.log(puzzle2());
