/**
 * Day 2: Red-Nosed Reports
 *
 * --- Part 1 ---
 * Each line is a report, and each number is a level.
 * A report is deemed "safe" if:
 * - Levels are all increasing or all decreasing
 * - Any two adjacent levels differ by 1-3
 * Find total number of "safe" reports
 *
 * 1. Loop through each line
 *    a. Determine if readings are generally increasing or decreasing
 *    b. If so, find the min and max change in levels
 *    c. If the min is >=1 and max is <=3, it's safe. Otherwise, not safe
 *    d. Add safe reports to count
 * 6. Return count
 */
import { getInputData } from "../utils/utils.js";

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

function countSafeReports(filePath, dampener = false) {
  const reports = getInputData(filePath).split("\n");
  let safeReportCount = 0;

  reports.forEach((report) => {
    const levels = report.split(" ").map(Number);
    if (!dampener && isSafe(levels)) safeReportCount++;
    if (dampener && isSafeDampened(levels)) safeReportCount++;
  });

  return safeReportCount;
}

/** --- Part 2 ---
 * The Problem Dampener module can remove a single level to make it safe
 *
 * For each report:
 * 1. If the report is safe normally, it's safe
 * 2. Otherwise, try removing one level and check if safe
 *    a. If safe, then it's safe!
 * 3. If no modified report is safe, it's not safe
 */

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

console.log(countSafeReports("input.txt"));
console.log(countSafeReports("input.txt", true));
