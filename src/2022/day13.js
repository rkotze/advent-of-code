const { readPuzzle } = require("../file-reader");

function compare(l, r) {
  if (Number.isInteger(l) && Number.isInteger(r)) {
    if (l < r) return -1;
    if (l == r) return 0;
    return 1;
  } else if (Array.isArray(l) && Array.isArray(r)) {
    let i = 0;
    while (i < l.length && i < r.length) {
      const c = compare(l[i], r[i]);
      if (c == -1) return -1;
      if (c == 1) return 1;
      i += 1;
    }
    if (i == l.length && i < r.length) return -1;
    if (i == r.length && i < l.length) return 1;
    return 0;
  } else if (Number.isInteger(l) && Array.isArray(r)) {
    return compare([l], r);
  } else {
    return compare(l, [r]);
  }
}

function puzzle1() {
  const data = readPuzzle("2022", "day13.txt", (data) => {
    return data.split(/\n\n/g).map((v) => v.split("\n"));
  });
  const trackIndex = [];
  for (let i = 0; i < data.length; i++) {
    const [left, right] = data[i];
    const evLeft = eval(left);
    const evRight = eval(right);
    if (compare(evLeft, evRight) == -1) {
      trackIndex.push(i + 1);
    }
  }
  return trackIndex.reduce((a, b) => (a += b));
}

console.log(puzzle1());
