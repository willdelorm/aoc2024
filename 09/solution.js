import { getInputData } from "../utils/utils.js";
import { Node, DoublyLinkedList } from "../utils/linkedList.js";

function main(fp) {
  const data = getInputData(fp).split("");

  const fileSystem = new DoublyLinkedList();
  let id = 0;
  data.forEach((len, i) => {
    for (let j = 0; j < Number(len); j++) {}
  });
  // Convert dense-format data
  // Condense data
  // Calculate filesystem checksum
}

console.log("test", main("test.txt"));
// console.log("input", main("input.txt"));
