/**
 * Day 3: Mull It Over
 *
 * --- Part 1 ---
 * Find all uncorrupted mul instructions following the pattern mul(X,Y)
 * X and Y are 1-3 digit numbers and mul multiplies the two numbers
 * Any variation to the pattern should be ignored
 * Find the total of all the uncorrupted mul results
 *
 * 1. Find all valid instructions
 * 2. Multiple each instruction and total them together
 */
import { getInputData } from "../utils/utils.js";

function getTotalResult(filePath) {
  const data = getInputData(filePath);
  console.log(data);

  const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;
  const uncorruptedMuls = data.match(MUL_REGEX);
  console.log(uncorruptedMuls);

  let totalResult = 0;
  uncorruptedMuls.forEach((instruction) => {
    const nums = instruction.match(/\d+/g).map(Number);
    const result = Math.imul(...nums);
    totalResult += result;
  });

  return totalResult;
}

console.log(getTotalResult("input.txt"));
