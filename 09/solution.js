import { getInputData } from "../utils/utils.js";
import { DoublyLinkedList } from "../utils/linkedList.js";

function main(fp) {
  const data = getInputData(fp).split("");

  // Convert dense-format data
  const fileSystem = new DoublyLinkedList();
  let id = 0;
  data.forEach((len, i) => {
    const val = i % 2 === 0 ? id : ".";
    for (let j = 0; j < Number(len); j++) {
      fileSystem.addItem(val);
    }
    if (val === id) id++;
  });
  // console.log(fileSystem.print());

  // Condense data
  let nextEmpty = fileSystem.head;
  let lastFile = fileSystem.tail;
  while (nextEmpty !== fileSystem.tail) {
    if (nextEmpty.data !== ".") {
      nextEmpty = nextEmpty.next;
    }
    if (nextEmpty === lastFile) break;
    while (lastFile.data === ".") lastFile = lastFile.prev;

    nextEmpty.data = lastFile.data;
    lastFile.data = ".";
  }
  // console.log(fileSystem.print());

  // Calculate filesystem checksum
  let checksum = 0;
  let curr = fileSystem.head,
    index = 0;
  while (curr !== null) {
    if (curr.data !== ".") checksum += Number(curr.data) * index;
    curr = curr.next;
    index++;
  }
  return checksum;
}

console.log("test", main("test.txt"));
// console.log("input", main("input.txt"));
