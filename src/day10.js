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

function puzzle2() {
  const data = fileReader("day10.txt");
  const list = data
    .split("\n")
    .map((jolt) => Number(jolt))
    .sort((a, b) => a - b);
  list.unshift(0);
  return combinations(list);
}

function combinations(arr, cache = {}) {
  const key = arr.join(""); // cache needed for full input
  if (key in cache) return cache[key];

  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i + 1] - arr[i - 1];
    if (diff <= 3) {
      const arr2 = [arr[i - 1]].concat(arr.slice(i + 1));
      count += combinations(arr2, cache);
    }
  }
  cache[key] = count;
  return count;
}

console.log(puzzle1());
console.log(puzzle2());
