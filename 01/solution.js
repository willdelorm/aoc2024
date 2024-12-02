/**
 * Day 1: Historian Hysteria
 *
 * --- Part 1 ---
 * Compare two lists by pairing the smallest number from each list, then the second-smallest numbers, and so on.
 * For each pair, calculate the distance between them.
 * Find the total distance by adding up all the distances.
 *
 * 1. Break the file into two arrays
 * 2. Sort the arrays
 * 3. Loop through each index, calculate the difference and add it to the total
 */
import { getInputData } from "../utils/utils";

function getListsFromInput(inputData) {
  const locationIds = inputData.match(/[0-9]+/g);
  const listLeft = [],
    listRight = [];

  locationIds.forEach((locationId, index) => {
    if (index % 2 === 0) {
      listLeft.push(locationId);
    } else {
      listRight.push(locationId);
    }
  });

  return { listLeft, listRight };
}

function calculateTotalDistance(filePath) {
  console.time("calculateTotalDistance");

  const inputData = getInputData(filePath);
  const { listLeft, listRight } = getListsFromInput(inputData);
  listLeft.sort();
  listRight.sort();

  let totalDistance = 0;
  listLeft.forEach((locationId, index) => {
    const leftId = Number(locationId),
      rightId = Number(listRight[index]);
    totalDistance += Math.abs(leftId - rightId);
  });

  console.timeEnd("calculateTotalDistance");
  return totalDistance;
}

console.log(calculateTotalDistance("input.txt"));

/**
 * --- Part 2 ---
 * Calculate the total similarity score.
 * For each item in the left list, multiply it by the number of times it appears in the right column.
 * Add them all together for the final score.
 *
 * 1. Break up the file
 * 2. Create object of location IDs in right list and their number of appearances
 * 3. Step through left list, check object for multiplier and add to total
 */
function calculateSimilarityScore(filePath) {
  console.time("calculateSimilarityScore");

  const inputData = getInputData(filePath);
  const { listLeft, listRight } = getListsFromInput(inputData);

  const listMultipliers = {};
  listRight.forEach((locationId) => {
    if (listMultipliers[locationId]) {
      listMultipliers[locationId]++;
    } else {
      listMultipliers[locationId] = 1;
    }
  });

  let totalSimilarityScore = 0;
  listLeft.forEach((locationId) => {
    const multiplier = listMultipliers[locationId]
      ? listMultipliers[locationId]
      : 0;
    totalSimilarityScore += Number(locationId) * multiplier;
  });

  console.timeEnd("calculateSimilarityScore");
  return totalSimilarityScore;
}

console.log(calculateSimilarityScore("input.txt"));
