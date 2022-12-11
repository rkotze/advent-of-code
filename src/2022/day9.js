const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2022", "day9.txt");
  let posH = [0, 0];
  let posT = [0, 0];
  const trackTail = new Map();

  for (const strDir of data) {
    const [dir, steps] = strDir.split(" ");
    let newPos = moveHT(trackTail, [dir, Number(steps)], posH, posT);
    posH = newPos[0];
    posT = newPos[1];
  }

  return trackTail.size;
}

function moveHT(track, [dir, steps], [hy, hx], [ty, tx], step = 0) {
  const key = [ty, tx].join(":");
  if (!track.has(key)) track.set(key, 1);
  if (steps === step)
    return [
      [hy, hx],
      [ty, tx],
    ];
  if (dir === "R") {
    const t = moveT([hy, hx + 1], [ty, tx]) ? [hy, tx + 1] : [ty, tx];
    return moveHT(track, [dir, steps], [hy, hx + 1], t, step + 1);
  }
  if (dir === "U") {
    const t = moveT([hy - 1, hx], [ty, tx]) ? [ty - 1, hx] : [ty, tx];
    return moveHT(track, [dir, steps], [hy - 1, hx], t, step + 1);
  }
  if (dir === "L") {
    const t = moveT([hy, hx - 1], [ty, tx]) ? [hy, tx - 1] : [ty, tx];
    return moveHT(track, [dir, steps], [hy, hx - 1], t, step + 1);
  }
  if (dir === "D") {
    const t = moveT([hy + 1, hx], [ty, tx]) ? [ty + 1, hx] : [ty, tx];
    return moveHT(track, [dir, steps], [hy + 1, hx], t, step + 1);
  }
}

function moveT([hy, hx], [ty, tx]) {
  const y = Math.abs(hy - ty);
  const x = Math.abs(hx - tx);
  return y > 1 || x > 1;
}

console.log(puzzle1());
