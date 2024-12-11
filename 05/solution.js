import { getInputData } from "../utils/utils.js";

function sortRules(rules) {
  function mergeSort(array) {
    if (array.length === 1) {
      return array;
    }

    // Split Array in into right and left
    const length = array.length;
    const middle = Math.floor(length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  return mergeSort(rules);
}

function sortUpdate(update, rules) {
  function mergeSort(array) {
    if (array.length === 1) {
      return array;
    }

    // Split Array in into right and left
    const length = array.length;
    const middle = Math.floor(length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      // console.log(
      //   left[leftIndex].concat(right[rightIndex]),
      //   rules.includes(left[leftIndex].concat(right[rightIndex]))
      // );
      if (rules.includes(left.concat(right))) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  return mergeSort(update);
}

function sumMiddles(fp, orderedUpdates = true) {
  const data = getInputData(fp).split("\n");
  const rules = sortRules(data.slice(0, data.indexOf(""))).map((rule) =>
    rule.split("|")
  );
  const updates = data
    .slice(data.indexOf("") + 1)
    .map((update) => update.split(","));

  const updatesInOrder = [],
    sortedUpdates = [];
  updates.forEach((update) => {
    const activeRules = rules.filter(
      (rule) => update.includes(rule[0]) && update.includes(rule[1])
    );

    let isInOrder = true;
    activeRules.forEach((rule) => {
      if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
        isInOrder = false;
        return;
      }
    });

    if (isInOrder) {
      updatesInOrder.push(update);
    } else {
      sortedUpdates.push(
        sortUpdate(
          update,
          activeRules.map((a) => a.join(""))
        )
      );
    }
  });

  if (orderedUpdates) {
    return updatesInOrder.reduce((sum, update) => {
      return sum + Number(update[Math.floor(update.length / 2)]);
    }, 0);
  } else {
    console.log(sortedUpdates);
  }
}

console.log(sumMiddles("test.txt"));
// console.log(sumMiddles("input.txt"));
console.log(sumMiddles("test.txt", false));
