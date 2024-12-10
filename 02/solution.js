/**
 *  ================================
 *  === Day 2: Red-Nosed Reports ===
 *  ================================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function countSafeReports(fp, dampener = false) {
  const data = getInputData(fp).split("\n");

  let safeReportCount = 0;
  data.forEach((report) => {
    const levels = report.split(" ").map(Number);
    if (!dampener && isSafe(levels)) safeReportCount++;
    if (dampener && isSafeDampened(levels)) safeReportCount++;
  });

  return safeReportCount;
}

function isSafe(nums) {
  const diffs = [];
  for (let i = 1; i < nums.length; i++) {
    diffs.push(nums[i] - nums[i - 1]);
  }

  let posDiffs = 0,
    negDiffs = 0;
  diffs.forEach((diff) => {
    if (diff > 0) posDiffs++;
    if (diff < 0) negDiffs++;
  });

  if (posDiffs > nums.length - 2 || negDiffs > nums.length - 2) {
    const diffMin = Math.min(...diffs.map(Math.abs));
    const diffMax = Math.max(...diffs.map(Math.abs));

    return diffMin >= 1 && diffMax <= 3 ? 1 : 0;
  }
  return 0;
}

//* Part 2
function isSafeDampened(nums) {
  if (isSafe(nums)) return 1;
  else {
    for (let i = 0; i < nums.length; i++) {
      if (isSafe([...nums.slice(0, i), ...nums.slice(i + 1)])) {
        return 1;
      }
    }
  }
  return 0;
}

console.log("Part 1:", countSafeReports("input.txt"));
console.log("Part 2:", countSafeReports("input.txt", true));
