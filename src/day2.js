const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day2.txt");
  const list = data.split("\n");
  let count = 0;
  for (const password of list) {
    if (!password) continue;
    const policy = password.match(/(\d+)-(\d+)\s([a-z]):\s(.+)/i);

    const [, start, end, char, pass] = policy;
    const charFound = (pass.match(new RegExp(char, "g")) || []).length;
    if (charFound >= Number(start) && charFound <= Number(end)) count++;
  }
  return count;
}

function puzzle2() {
  const data = fileReader("day2.txt");
  const list = data.split("\n");
  let count = 0;
  for (const password of list) {
    if (!password) continue;
    const policy = password.match(/(\d+)-(\d+)\s([a-z]):\s(.+)/i);

    const [, start, end, char, pass] = policy;
    const first = pass.charAt(Number(start) - 1) === char;
    const second = pass.charAt(Number(end) - 1) === char;
    if (!(first && second) && (first || second)) count++;
  }
  return count;
}

exports.puzzle1 = puzzle1;
exports.puzzle2 = puzzle2;
