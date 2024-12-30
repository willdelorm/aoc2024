/**
 *  ============================
 *  === Day 7: Bridge Repair ===
 *  ============================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function main(fp, func) {
  const data = getInputData(fp)
    .split(/\r?\n/)
    .map((line) => {
      const vals = line.match(/\d+/g);
      return { output: vals[0], inputs: vals.slice(1) };
    });

  const trueOutputs = [];
  data.forEach((line) => {
    const { output, inputs } = line;

    if (func(inputs[0], inputs.slice(1), output) > 0) {
      trueOutputs.push(output);
    }
  });

  return trueOutputs.reduce((sum, next) => eval(`${sum} + ${next}`));
}

function hasValidEquation(str, inputs, output) {
  if (!inputs.length) {
    if (str == output) {
      return 1;
    }
    return 0;
  } else {
    if (Number(str) > Number(output)) {
      return 0;
    }
    return (
      hasValidEquation(eval(`${str}+${inputs[0]}`), inputs.slice(1), output) +
      hasValidEquation(eval(`${str}*${inputs[0]}`), inputs.slice(1), output)
    );
  }
}

function hasValidWithThree(str, inputs, output) {
  if (!inputs.length) {
    if (str == output) {
      return 1;
    }
    return 0;
  } else {
    if (Number(str) > Number(output)) {
      return 0;
    }
    return (
      hasValidWithThree(eval(`${str}+${inputs[0]}`), inputs.slice(1), output) +
      hasValidWithThree(eval(`${str}*${inputs[0]}`), inputs.slice(1), output) +
      hasValidWithThree(eval(`${str}${inputs[0]}`), inputs.slice(1), output)
    );
  }
}

console.log("Test:", main("test.txt", hasValidEquation)); // 1ms
console.log("Part 1:", main("input.txt", hasValidEquation)); // 1s
console.log("Part 2:", main("input.txt", hasValidWithThree)); // 41.7s
