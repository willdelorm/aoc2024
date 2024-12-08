import { getInputData } from "../utils/utils.js";

function main(fp, withHarmonics = false) {
  const data = getInputData(fp).split("\r\n");
  const dataTape = data.join("");
  const width = data[0].length;
  const height = data.length;

  const antennaGroups = {};
  dataTape.split("").forEach((char, i) => {
    let x = i % width;
    let y = Math.floor(i / height);

    if (char !== ".") {
      antennaGroups[char] = !antennaGroups[char]
        ? [[x, y]]
        : [...antennaGroups[char], [x, y]];
    }
  });

  let antinodes = new Set();
  Object.keys(antennaGroups).forEach((id) => {
    const antennaGroup = antennaGroups[id];

    for (let i = 0; i < antennaGroup.length; i++) {
      const iPos = antennaGroup[i];
      if (withHarmonics) antinodes.add(String(iPos));
      for (let j = i + 1; j < antennaGroup.length; j++) {
        const jPos = antennaGroup[j];
        if (withHarmonics) antinodes.add(String(jPos));
        const posDiff = [iPos[0] - jPos[0], iPos[1] - jPos[1]];

        let antiNode1 = [iPos[0] + posDiff[0], iPos[1] + posDiff[1]];
        if (!withHarmonics) {
          if (
            antiNode1[0] >= 0 &&
            antiNode1[0] < width &&
            antiNode1[1] >= 0 &&
            antiNode1[1] < height
          ) {
            antinodes.add(String(antiNode1));
          }
        } else {
          while (
            antiNode1[0] >= 0 &&
            antiNode1[0] < width &&
            antiNode1[1] >= 0 &&
            antiNode1[1] < height
          ) {
            antinodes.add(String(antiNode1));
            antiNode1 = [antiNode1[0] + posDiff[0], antiNode1[1] + posDiff[1]];
          }
        }

        let antiNode2 = [jPos[0] - posDiff[0], jPos[1] - posDiff[1]];
        if (!withHarmonics) {
          if (
            antiNode2[0] >= 0 &&
            antiNode2[0] < width &&
            antiNode2[1] >= 0 &&
            antiNode2[1] < height
          ) {
            antinodes.add(String(antiNode2));
          }
        } else {
          while (
            antiNode2[0] >= 0 &&
            antiNode2[0] < width &&
            antiNode2[1] >= 0 &&
            antiNode2[1] < height
          ) {
            antinodes.add(String(antiNode2));
            antiNode2 = [antiNode2[0] - posDiff[0], antiNode2[1] - posDiff[1]];
          }
        }
      }
    }
  });

  console.log(antinodes);
  return antinodes.size;
}

console.log("test", main("test.txt"));
console.log("input", main("input.txt"));
console.log("test", main("test.txt", true));
console.log("test2", main("test2.txt", true));
console.log("input", main("input.txt", true));
