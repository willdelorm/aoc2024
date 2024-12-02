import { readFileSync } from "fs";

export function getInputData(filePath) {
  const inputData = readFileSync(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });

  return inputData;
}
