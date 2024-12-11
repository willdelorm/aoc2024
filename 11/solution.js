/**
 *  =================================
 *  === Day 11: Plutonian Pebbles ===
 *  =================================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function main(fp, blinks = 1) {
  const data = getInputData(fp).split(" ");

  let stones = [];
  data.forEach((stone) => {
    stones.push(blinkTransform(stone, blinks));
  });

  return stones.reduce((acc, val) => acc + val, 0);

  // let stones = [...data];
  // for (let i = 0; i < blinks; i++) {
  //   const newStones = [];
  //   stones.forEach((stone) => {
  //     ``;
  //     if (stone == 0) newStones.push(1);
  //     else if (String(stone).length % 2 === 0) {
  //       newStones.push(
  //         Number(String(stone).slice(0, String(stone).length / 2))
  //       );
  //       newStones.push(Number(String(stone).slice(String(stone).length / 2)));
  //     } else newStones.push(stone * 2024);
  //   });
  //   stones = [...newStones];
  // }

  // return stones.length;
}

function blinkTransform(stone, blinks) {
  const newStones = [];

  if (stone == 0) newStones.push(1);
  else if (String(stone).length % 2 === 0) {
    newStones.push(Number(String(stone).slice(0, String(stone).length / 2)));
    newStones.push(Number(String(stone).slice(String(stone).length / 2)));
  } else newStones.push(stone * 2024);

  if (blinks === 1) return newStones.length;
  if (newStones.length === 1) return blinkTransform(newStones[0], blinks - 1);
  return (
    blinkTransform(newStones[0], blinks - 1) +
    blinkTransform(newStones[1], blinks - 1)
  );
}

console.log("Test:", main("test.txt", 25)); //55312
console.log("Part 1:", main("input.txt", 25));
// console.log("Part 2:", main("input.txt", 75));
