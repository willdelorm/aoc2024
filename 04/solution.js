/**
 *  ===========================
 *  === Day 4: Ceres Search ===
 *  ===========================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
const ADJACENT_SPACES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function main(fp, word) {
  const data = getInputData(fp).split(/\r?\n/);
  const dataTape = data.join("");
  const wordChars = word.split("");

  const width = data[0].length;
  const height = data.length;

  // Get position of all instances of first letter
  let firstLetters = [];
  dataTape.split("").forEach((char, i) => {
    let x = i % width;
    let y = Math.floor(i / height);

    if (char === wordChars[0]) {
      firstLetters.push([x, y]);
    }
  });

  function nextStep(pos, dir, slicedArr) {
    const [nextX, nextY] = [pos[0] + dir[0], pos[1] + dir[1]];
    // Is next pos valid?
    if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
      return 0;
    }
    // Is next pos the letter we want?
    const tapePos = width * nextY + nextX;
    if (dataTape[tapePos] !== slicedArr[0]) {
      return 0;
    }
    // Is next pos the final letter?
    if (slicedArr.length !== 1) {
      return nextStep([nextX, nextY], dir, slicedArr.slice(1));
    }
    return 1;
  }

  // Validate each X
  let count = 0;
  firstLetters.forEach((pos) => {
    ADJACENT_SPACES.forEach((dir) => {
      if (nextStep(pos, dir, wordChars.slice(1))) {
        count++;
      }
    });
  });

  return count;
}

console.log(main("test.txt", "XMAS")); // 18
console.log(main("input.txt", "XMAS"));
