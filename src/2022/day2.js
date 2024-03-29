const { readPuzzle } = require("../file-reader");

const playerA = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};

const playerB = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const winner = ["AY", "BZ", "CX"];
function evaluate(a, b) {
  const opponent = playerA[a];
  const you = playerB[b];
  if (opponent === you) return { state: "draw", points: you + 3 };
  if (winner.some((w) => w === a + b)) return { state: "win", points: you + 6 };
  return { state: "lose", points: you };
}

function puzzle1() {
  const data = readPuzzle("2022", "day2.txt");
  let total = 0;
  for (const shapes of data) {
    const result = evaluate(...shapes.split(" "));
    total += result.points;
  }
  return total;
}

console.log(puzzle1());

const win = {
  A: "B",
  B: "C",
  C: "A",
};

const lose = {
  A: "C",
  B: "A",
  C: "B",
};

function resolve(a, outcome) {
  if (outcome === "Y") return playerA[a] + 3;
  if (outcome === "X") return playerA[lose[a]];
  return playerA[win[a]] + 6;
}

function puzzle2() {
  const data = readPuzzle("2022", "day2.txt");
  let total = 0;
  for (const shapes of data) {
    total += resolve(...shapes.split(" "));
  }
  return total;
}

console.log(puzzle2());
