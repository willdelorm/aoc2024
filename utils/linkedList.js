export class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    if (this.head == null) return true;
    return false;
  }

  addItem(val) {
    let temp = new Node(val);

    if (this.head == null) {
      this.head = temp;
      this.tail = temp;
    } else {
      temp.prev = this.tail;
      this.tail.next = temp;
      this.tail = this.tail.next;
    }
  }

  display() {
    if (!this.isEmpty()) {
      let curr = this.head;
      while (curr !== null) {
        console.log(curr.data);
        curr = curr.next;
      }
    }
  }

  print() {
    let output = "";
    if (!this.isEmpty()) {
      let curr = this.head;
      while (curr !== null) {
        output += curr.data;
        curr = curr.next;
      }
    }
    return output;
  }
}
