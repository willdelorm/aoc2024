import { getInputData } from "../utils/utils.js";

const ADJACENT_SPACES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function searchWords(fp, str, p2 = false) {
  function nextStep(pos, dir, slicedArr) {
    const [nextX, nextY] = [pos[0] + dir[0], pos[1] + dir[1]];
    // console.log([nextX, nextY]);

    // Is next pos valid?
    if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
      // console.log("Off grid");
      return 0;
    }

    // Is next pos the letter we want?
    const tapePos = width * nextY + nextX;
    if (dataTape[tapePos] !== slicedArr[0]) {
      // console.log("Wrong letter", dataTape[[nextX, nextY].join("")]);
      return 0;
    }

    // Is next pos the final letter?
    if (slicedArr.length !== 1) {
      // console.log("Keep going!");
      return nextStep([nextX, nextY], dir, slicedArr.slice(1));
    }
    // console.log("We have a winner!");
    return 1;
  }

  // console.log("--- Begin XMAS count ---");
  const data = getInputData(fp).split("\n");
  const dataTape = data.join("");
  const strArr = str.split("");

  // Word Search dimensions
  const width = data[0].length;
  const height = data.length;
  // console.log(`Grid dimensions:`, [width, height]);

  // Get position of all instances of first letter
  let firstLetters = [];
  dataTape.split("").forEach((char, i) => {
    let x = i % width;
    let y = Math.floor(i / height);

    if (char === strArr[0]) {
      firstLetters.push([x, y]);
    }
  });
  // console.log("All X positions:\n", firstLetters);

  // Validate each X
  let foundWords = 0;
  let posFoundAs = {};
  firstLetters.forEach((pos) => {
    ADJACENT_SPACES.forEach((dir) => {
      // console.log("checking", pos, "toward", dir);
      if (nextStep(pos, dir, strArr.slice(1))) {
        foundWords++;
        // console.log(data[pos[1] + dir[1]][pos[0] + dir[0]]);
        if (p2) {
          const posA = [pos[0] + dir[0], pos[1] + dir[1]];
          // console.log(posA);
          if (posFoundAs[posA]) posFoundAs[posA]++;
          else posFoundAs[posA] = 1;
        }
      }
    });
  });

  console.log(str, foundWords);
  if (p2) {
    // console.log(posFoundAs);
    const numX_MAS = Object.keys(posFoundAs)
      .sort()
      .reduce((count, pos) => {
        return posFoundAs[pos] === 2 ? count + 1 : count;
      }, 0);
    console.log("X-MAS", numX_MAS);
  }
}

// searchWords("test.txt", "XMAS");
// searchWords("input.txt", "XMAS");
searchWords("test2.txt", "MAS", true);
searchWords("input.txt", "MAS", true);
