const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2023", "day2.txt");
  const redMax = 12;
  const greenMax = 13;
  const blueMax = 14;
  const regBlue = /(\d+)\sblue/g;
  const regRed = /(\d+)\s(red)/g;
  const regGreen = /(\d+)\s(green)/g;
  let total = 0;
  for (let index = 0; index < data.length; index++) {
    const game = data[index];
    let cubes = [
      ...game.match(regBlue),
      ...game.match(regRed),
      ...game.match(regGreen),
    ];

    const tooMany = [];
    for (const cube of cubes) {
      const split = cube.split(" ");
      if (cube.includes("red")) tooMany.push(Number(split[0]) > redMax);
      if (cube.includes("green")) tooMany.push(Number(split[0]) > greenMax);
      if (cube.includes("blue")) tooMany.push(Number(split[0]) > blueMax);
    }

    if (!tooMany.includes(true)) total += index + 1;
  }
  return total;
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2023", "day2.txt");
  const regBlue = /(\d+)\sblue/g;
  const regRed = /(\d+)\s(red)/g;
  const regGreen = /(\d+)\s(green)/g;
  let total = 0;
  for (let index = 0; index < data.length; index++) {
    const game = data[index];
    let cubes = [
      ...game.match(regBlue),
      ...game.match(regRed),
      ...game.match(regGreen),
    ];

    const red = [];
    const green = [];
    const blue = [];
    for (const cube of cubes) {
      const split = cube.split(" ");
      if (cube.includes("red")) red.push(Number(split[0]));
      if (cube.includes("green")) green.push(Number(split[0]));
      if (cube.includes("blue")) blue.push(Number(split[0]));
    }

    total += Math.max(...red) * Math.max(...green) * Math.max(...blue);
  }
  return total;
}

console.log(puzzle2());
