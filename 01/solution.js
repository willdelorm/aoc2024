/**
 *  =================================
 *  === Day 1: Historian Hysteria ===
 *  =================================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function calculateTotalDistance(fp) {
  const data = getInputData(fp);
  const { listLeft, listRight } = getLists(data);

  listLeft.sort();
  listRight.sort();

  let totalDistance = 0;
  listLeft.forEach((locationId, index) => {
    const leftId = Number(locationId),
      rightId = Number(listRight[index]);
    totalDistance += Math.abs(leftId - rightId);
  });

  return totalDistance;
}

function getLists(data) {
  const locationIds = data.match(/[0-9]+/g);
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

//* Part 2
function calculateSimilarityScore(fp) {
  const data = getInputData(fp);
  const { listLeft, listRight } = getLists(data);

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

  return totalSimilarityScore;
}

console.log("Part 1:", calculateTotalDistance("input.txt"));
console.log("Part 2:", calculateSimilarityScore("input.txt"));
