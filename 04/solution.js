import { getInputData } from "../utils/utils.js";

function countXMAS(fp) {
  const data = getInputData(fp).split("\r\n");
  const dataTape = data.join("");

  // Word Search dimensions
  const width = data[0].length;
  const height = data.length;

  // Get coordinates of all X's
  let xArr = [];
  for (let i = 0; i < dataTape.length; i++) {
    let char = dataTape[i];
    // Coordinates of char
    let x = Math.floor(i / width);
    let y = i % height;

    if (char === "X") {
      xArr.push([x, y]);
    }
  }
  console.log(xArr);

  // Build adjacent cells to check
  const relativelyAdjacent = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Ignore center because X
      if (i === 0 && j === 0) continue;
      relativelyAdjacent.push([i, j]);
    }
  }
  console.log(relativelyAdjacent);

  let foundWords = 0;
  let xmasArr = ["M", "A", "S"];
  xArr.forEach(([x, y]) => {
    console.log(x, y);
    relativelyAdjacent.forEach(([aX, aY]) => {
      if (nextStep(aX, aY, xmasArr)) {
        foundWords++;
      }
    });
  });
}

function nextStep(aX, aY, arr) {
  if (dataTape[[x + aX, y + aY].join("")] === arr[0]) {
    if (xmasArr[0] === "S") return 1;
    return nextStep(aX, aY, arr.slice(1));
  }
  return 0;
}

countXMAS("test.txt");
