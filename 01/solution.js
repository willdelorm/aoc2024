/**
 *  =================================
 *  === Day 1: Historian Hysteria ===
 *  =================================
 */

import { getInputData } from "../utils/utils.js";

//* Part 1
function calculateTotalDistance(fp) {
  const data = getInputData(fp);
  const { list1, list2 } = getLists(data);

  return list1.reduce((sum, _, i) => {
    return sum + Math.abs(list1[i] - list2[i]);
  }, 0);
}

function getLists(data) {
  const locationIds = data.match(/[0-9]+/g);
  const list1 = [],
    list2 = [];

  locationIds.forEach((locationId, index) => {
    if (index % 2 === 0) {
      list1.push(locationId);
    } else {
      list2.push(locationId);
    }
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  return { list1, list2 };
}

//* Part 2
function calculateSimilarityScore(fp) {
  const data = getInputData(fp);
  const { list1, list2 } = getLists(data);

  const numCounts = {};
  list2.forEach((locationId) => {
    numCounts[locationId]
      ? numCounts[locationId]++
      : (numCounts[locationId] = 1);
  });

  return list1.reduce((sum, id) => {
    const multiplier = numCounts[id] ? numCounts[id] : 0;
    return sum + Number(id) * multiplier;
  }, 0);
}

console.log("Part 1:", calculateTotalDistance("input.txt"));
console.log("Part 2:", calculateSimilarityScore("input.txt"));
