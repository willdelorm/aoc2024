/**
 *  =================================
 *  === Day 11: Plutonian Pebbles ===
 *  =================================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function main(fp, blinks = 1) {
  const data = getInputData(fp).split(" ");

  let stoneCounts = data.map((stone) => blinkTransform(stone, blinks));

  return stoneCounts.reduce((sum, count) => sum + count, 0);
}

function blinkTransform(stone, blinks, memo = {}) {
  const key = `${stone},${blinks}`;
  if (memo[key]) return memo[key];

  const newStones = [];
  const stoneStr = String(stone);

  if (stone == 0) {
    newStones.push(1);
  } else if (stoneStr.length % 2 === 0) {
    newStones.push(
      Number(stoneStr.slice(0, stoneStr.length / 2)),
      Number(stoneStr.slice(stoneStr.length / 2))
    );
  } else {
    newStones.push(stone * 2024);
  }

  const nextBlink = blinks - 1;

  let result;
  if (nextBlink === 0) {
    result = newStones.length;
  } else if (newStones.length === 1) {
    result = blinkTransform(newStones[0], nextBlink, memo);
  } else {
    result =
      blinkTransform(newStones[0], nextBlink, memo) +
      blinkTransform(newStones[1], nextBlink, memo);
  }

  memo[key] = result;
  return memo[key];
}

console.log("Part 1:", main("input.txt", 25));
console.log("Part 2:", main("input.txt", 75));
