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
 * 2. Determine if level direction is increasing or decreasing
 * 3. Loop looking at 1st and 2nd levels
 * 4. if it matches direction AND is within 1-3 range, add to count
 * 5. else continue to next report
 * 6. Return count
 */
import { getInputData } from "../utils/utils.js";

function getLevelDirection(l1, l2) {
  if (l1 < l2) {
    return "increasing";
  } else if (l1 > l2) {
    return "decreasing";
  } else {
    return "unsafe";
  }
}

function matchesDirection(reportDirection, stepDirection) {
  return reportDirection === stepDirection;
}

function differsGradually(l1, l2) {
  const levelsDiff = Math.abs(l1 - l2);
  return levelsDiff >= 1 && levelsDiff <= 3;
}

function countSafeReports(filePath) {
  const reports = getInputData(filePath).split("\n");
  let safeReportCount = 0;

  reports.forEach((report) => {
    const levels = report.split(" ").map(Number);

    const reportDirection = getLevelDirection(levels[0], levels[1]);
    if (reportDirection === "unsafe") return;

    let isTolerableReport = true;
    let lastLevel, currentLevel;
    for (let i = 1; i < levels.length; i++) {
      lastLevel = levels[i - 1];
      currentLevel = levels[i];

      const stepDirection = getLevelDirection(lastLevel, currentLevel);
      if (
        !matchesDirection(reportDirection, stepDirection) ||
        !differsGradually(lastLevel, currentLevel)
      ) {
        isTolerableReport = false;
        return;
      }
    }

    if (isTolerableReport) safeReportCount++;
  });

  return safeReportCount;
}

console.log(countSafeReports("input.txt"));
