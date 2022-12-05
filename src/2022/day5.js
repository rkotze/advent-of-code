const { readPuzzle } = require("../file-reader");

function formatData(data) {
  const rows = data.split(/\n/g);
  const crates = [];
  let next = 0;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].includes("1")) {
      next = i + 2;
      break;
    }
    const splinters = rows[i].split("");
    const baseCount = 4;
    let cratePos = 0;
    for (let j = 0; j < splinters.length; j += baseCount) {
      const crate = splinters[j + 1];
      if (/\s/.test(crate)) {
        cratePos += 1;
        continue;
      }
      if (Array.isArray(crates[cratePos])) {
        crates[cratePos].push(crate);
      } else {
        crates[cratePos] = [crate];
      }
      cratePos += 1;
    }
  }

  // console.log("end of creates", crates);
  const moves = [];
  for (let i = next; i < rows.length; i++) {
    const move = rows[i];
    moves.push(move.match(/(\d+)/g).map((num) => Number(num)));
  }
  // console.log(moves);
  return {
    crates,
    moves,
  };
}

function puzzle1() {
  const data = readPuzzle("2022", "day5.txt", formatData);

  const { crates, moves } = data;
  for (const [steps, from, to] of moves) {
    for (let i = 0; i < steps; i++) {
      const stack = crates[from - 1];

      let crate = stack.shift();
      crates[to - 1].unshift(crate);
    }
  }

  const topCrates = [];
  for (const stack of crates) {
    topCrates.push(stack.shift());
  }
  return topCrates.join("");
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2022", "day5.txt", formatData);

  const { crates, moves } = data;
  for (const [steps, from, to] of moves) {
    const stack = crates[from - 1];
    let crate = stack.splice(0, steps);
    crates[to - 1].splice(0, 0, ...crate);
  }

  const topCrates = [];
  for (const stack of crates) {
    topCrates.push(stack.shift());
  }
  return topCrates.join("");
}

console.log(puzzle2());
