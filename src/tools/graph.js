// Depth first can be recursive
// follows a direct path
function depthFirst(graph, src, cb) {
  const stack = [src];

  while (stack.length > 0) {
    const current = stack.pop();
    if (cb(current) === true) return true;
    for (const next of graph[current]) {
      stack.push(next);
    }
  }
}

// Breath first can NOT be recursive
// Looks at all immediate path for a node
function breathFirst(graph, src, cb) {
  const queue = [src];

  while (queue.length > 0) {
    const current = queue.shift();
    if (cb(current) === true) return true;
    for (const next of graph[current]) {
      queue.push(next);
    }
  }
}

module.exports = { depthFirst, breathFirst };
