/**
 *  ===========================
 *  === Day 3: Mull It Over ===
 *  ===========================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function getTotalResult(fp, withConditionals = false) {
  const data = getInputData(fp);

  const REGEX = !withConditionals
    ? /mul\(\d{1,3},\d{1,3}\)/g
    : /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
  const instructions = data.match(REGEX);

  let totalResult = 0;
  let isEnabled = true;
  instructions.forEach((instruction) => {
    if (!withConditionals) {
      const nums = instruction.match(/\d+/g).map(Number);
      totalResult += Math.imul(...nums);
    } else {
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
    }
  });

  return totalResult;
}

console.log("Part 1:", getTotalResult("input.txt"));
console.log("Part 2:", getTotalResult("input.txt", true));
