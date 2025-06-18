const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const [rules, books] = readPuzzle("2024", "day5.txt", (data) => {
    const [rules, books] = data.split("\n\n");
    return [
      rules.split("\n"),
      books.split("\n").map((pages) => pages.split(",").map(Number)),
    ];
  });

  let total = 0;

  for (let j = 0; j < books.length; j++) {
    const book = books[j];

    let validOrder = true;
    for (let i = 0; i < book.length - 1; i++) {
      const page = book[i];
      const rest = book.slice(i + 1);
      if (!rest.every((next) => rules.includes(page + "|" + next))) {
        validOrder = false;
        break;
      }
    }
    if (validOrder) {
      total += book[Math.floor(book.length / 2)];
    }
  }

  return total;
}

console.log(puzzle1());
