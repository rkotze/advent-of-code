const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day8.txt", (data) =>
    data.split(/\n/g).map((data) => data.split(/\s\|\s/g))
  );

  const unique = new Map();
  unique.set(2, 0); //1
  unique.set(3, 0); //7
  unique.set(4, 0); //4
  unique.set(7, 0); //8
  for (const [_, output] of list) {
    const eachNumber = output.split(" ");
    for (const num of eachNumber) {
      const numLength = num.length;
      if (unique.has(numLength))
        unique.set(numLength, unique.get(numLength) + 1);
    }
  }
  return Array.from(unique.values()).reduce((acc, cur) => acc + cur, 0);
}

console.log(puzzle1());
