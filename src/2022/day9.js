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

class Cell {
  constructor(y, x) {
    this.x = x;
    this.y = y;
  }

  update(y, x) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.y}:${this.x}`;
  }
}

function puzzle2() {
  const data = readPuzzle("2022", "day9.txt");
  const snake = new Array(10).fill(10).map((_) => new Cell(0, 0));

  const trackTail = new Set();

  for (const strDir of data) {
    const [dir, steps] = strDir.split(" ");
    moveHT2(trackTail, snake, [dir, Number(steps)]);
  }

  return trackTail.size;
}

function moveHT2(track, snake, [dir, steps], step = 0) {
  const key = snake[9].toString(":");
  if (!track.has(key)) track.add(key);
  if (steps === step) return;

  if (dir === "R") {
    moveSnake(snake, [snake[0].y, snake[0].x + 1]);
    return moveHT2(track, snake, [dir, steps], step + 1);
  }
  if (dir === "U") {
    moveSnake(snake, [snake[0].y - 1, snake[0].x]);
    return moveHT2(track, snake, [dir, steps], step + 1);
  }
  if (dir === "L") {
    moveSnake(snake, [snake[0].y, snake[0].x - 1]);
    return moveHT2(track, snake, [dir, steps], step + 1);
  }
  if (dir === "D") {
    moveSnake(snake, [snake[0].y + 1, snake[0].x]);
    return moveHT2(track, snake, [dir, steps], step + 1);
  }
}

function moveSnake(snake, head) {
  snake[0].update(...head);
  for (let i = 0; i < snake.length - 1; i++) {
    moveT2(snake[i], snake[i + 1]);
  }
}

function moveT2(cur, next) {
  const y = Math.abs(cur.y - next.y);
  const x = Math.abs(cur.x - next.x);

  if (y >= 2 && x >= 2) {
    next.update(
      cur.y > next.y ? cur.y - 1 : cur.y + 1,
      cur.x > next.x ? cur.x - 1 : cur.x + 1
    );
  } else if (y >= 2) {
    if (cur.y > next.y) {
      next.update(cur.y - 1, cur.x);
    } else {
      next.update(cur.y + 1, cur.x);
    }
  } else if (x >= 2) {
    if (cur.x > next.x) {
      next.update(cur.y, cur.x - 1);
    } else {
      next.update(cur.y, cur.x + 1);
    }
  }
}

console.log(puzzle2());
