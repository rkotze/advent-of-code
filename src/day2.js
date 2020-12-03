const { fileReader } = require("./file-reader");

function puzzle1() {
  const list = fileReader("day2.txt");
  let count = 0;
  for (const password of list) {
    const policy = password.match(/(\d+)-(\d+)\s([a-z]):\s(.+)/i);

    if (!policy) {
      console.log("log: ", password);
      continue;
    }

    const [, start, end, char, pass] = policy;
    const charFound = (pass.match(new RegExp(char, "g")) || []).length;
    if (charFound >= Number(start) && charFound <= Number(end)) count++;
  }
  return count;
}

exports.puzzle1 = puzzle1;
