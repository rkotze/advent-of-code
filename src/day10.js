const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day10.txt");
  const list = data
    .split("\n")
    .map((jolt) => Number(jolt))
    .sort((a, b) => a - b);
  list.unshift(0);
  let diff1 = 0;
  let diff3 = 1;
  for (let i = 0; i < list.length; i++) {
    const first = list[i];
    const second = list[i + 1];
    const diff = second - first;
    if (diff === 1) diff1++;
    if (diff === 3) diff3++;
  }
  return diff1 * diff3;
}

console.log(puzzle1());
