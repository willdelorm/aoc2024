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

  const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;
  const instructions = data.match(MUL_REGEX);

  let totalResult = 0;
  instructions.forEach((instruction) => {
    const nums = instruction.match(/\d+/g).map(Number);
    totalResult += Math.imul(...nums);
  });

  return totalResult;
}

console.log(getTotalResult("input.txt"));

/** --- Part 2 ---
 * There are two new conditional instructions, do() and don't()
 * - do() enables future mul instructions
 * - don't() disables future mul instructions
 * mul instructions are enabled at the start of the program
 * Find the new sum of the results
 *
 * 1. Find all valid mul and conditional instructions
 * 2. Check if instructions are enabled before processing each mul
 * 3. Return result
 */

function getTotalResultWithConditionals(filePath) {
  const data = getInputData(filePath);

  const INSTRUCTIONS_REGEX = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
  const instructions = data.match(INSTRUCTIONS_REGEX);

  let totalResult = 0;
  let isEnabled = true;
  instructions.forEach((instruction) => {
    const instructionType = instruction.match(/\w+('\w)?/)[0];

    switch (instructionType) {
      case "mul":
        if (!isEnabled) {
          break;
        } else {
          const nums = instruction.match(/\d+/g).map(Number);
          totalResult += Math.imul(...nums);
        }
        break;
      case "do":
        isEnabled = true;
        break;
      case "don't":
        isEnabled = false;
        break;
      default:
        console.log("How'd this get here?", instructionType);
    }
  });

  return totalResult;
}

console.log(getTotalResultWithConditionals("input.txt"));
