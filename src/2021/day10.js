const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day10.txt");
  const bracketKeys = {
    "[": "]",
    "(": ")",
    "{": "}",
    "<": ">",
  };

  const points = {
    "]": 57,
    ")": 3,
    "}": 1197,
    ">": 25137,
  };
  let total = 0;
  for (const brackets of list) {
    const bracketBits = brackets.split("");
    let queue = [bracketBits.shift()];
    while (queue.length > 0 && bracketBits.length > 0) {
      let bracket = queue[queue.length - 1];
      if (!bracketKeys[bracket]) {
        const closed = queue.pop();
        bracket = queue.pop();

        if (closed === bracketKeys[bracket]) continue;

        total += points[closed];
        break;
      }
      queue.push(bracketBits.shift());
    }
  }

  return total;
}

console.log(puzzle1());
