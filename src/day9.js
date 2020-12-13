const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day9.txt");
  const list = data.split("\n").map((val) => Number(val));
  const preambleLength = 25;
  let preamble = list.slice(0, preambleLength);

  for (let k = preambleLength; k < list.length; k++) {
    const answer = list[k];
    let answerFound = false;

    for (let i = 0; i < preamble.length; i++) {
      const first = preamble[i];
      for (let j = i + 1; j < preamble.length; j++) {
        const second = preamble[j];
        const sum = first + second;
        if (sum === answer) {
          i = preamble.length;
          j = preamble.length;
          answerFound = true;
          preamble.push(answer);
          preamble.shift();
          break;
        }
      }
    }
    if (!answerFound) {
      return answer;
    }
  }
  return 0;
}

console.log(puzzle1());
