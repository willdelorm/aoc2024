/**
 *  ==============================
 *  === Day 6: Guard Gallivant ===
 *  ==============================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function main(fp) {
  const labMap = getInputData(fp)
    .split(/\r?\n/)
    .map((row) => row.split(""));
  const height = labMap.length;
  const width = labMap[0].length;
  const DIRS = {
    0: [-1, 0],
    90: [0, 1],
    180: [1, 0],
    270: [0, -1],
  };

  let guard = {
    pos: [0, 0],
    dir: 0,
  };
  for (let i = 0; i < labMap.length; i++) {
    let row = labMap[i];
    if (row.includes("^")) {
      guard.pos = [i, row.indexOf("^")];
    }
  }

  let count = 0;
  while (true) {
    let [y, x] = guard.pos;
    if (labMap[y][x] !== "X") {
      labMap[y][x] = "X";
      count++;
    }

    let [nextY, nextX] = [y + DIRS[guard.dir][0], x + DIRS[guard.dir][1]];
    if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width) {
      break;
    }
    if (labMap[nextY][nextX] === "#") {
      while (labMap[nextY][nextX] === "#") {
        guard.dir = (guard.dir + 90) % 360;
        [nextY, nextX] = [y + DIRS[guard.dir][0], x + DIRS[guard.dir][1]];
      }
    }

    guard.pos = [nextY, nextX];
  }

  return count;
}

//* Part 2
// function main(fp) {}

console.log("Test:", main("test.txt"));
console.log("Part 1:", main("input.txt"));
// console.log("Part 2:", main("input.txt"));
