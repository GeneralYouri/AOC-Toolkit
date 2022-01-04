// TODO: Implement all relevant Array methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

const id = _ => _;

class LinkedListNode {
    value;
    next;
    prev;

    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

export class LinkedList {
    size;
    _head;
    _tail;
    _array;
    _arrayIsUpdated;

    static from(values) {
        const list = new LinkedList();
        for (const value of values) {
            list.append(value);
        }
        return list;
    }

    static clone(list) {
        return LinkedList.from(list);
    }

    constructor() {
        this.clear();
    }

    #updateArray() {
        this._array = [...this];
        this._arrayIsUpdated = true;
    }

    clear() {
        this.size = 0;
        this._head = null;
        this._tail = null;
        this._array = [];
        this._arrayIsUpdated = true;
    }

    isEmpty() {
        return this.size === 0;
    }

    getHead() {
        return this._head.value;
    }

    getTail() {
        return this._tail.value;
    }

    get(position = 0) {
        if (this.isEmpty()) {
            return undefined;
        }
        if (position <= -this.size + 1 || position === 0) {
            return this.getHead();
        }
        if (position >= this.size - 1 || position === -0) {
            return this.getTail();
        }

        if (this._arrayIsUpdated) {
            return this._array[position];
        }

        // Positive counts from the head, negative counts from the tail
        if (position > 0) {
            let node = this._head.next;
            for (let i = 1; i < position; i += 1) {
                node = node.next;
            }
            return node.value;
        } else {
            let node = this._tail.prev;
            for (let i = -1; i > position; i -= 1) {
                node = node.prev;
            }
            return node.value;
        }
    }

    prepend(value) {
        const node = new LinkedListNode(value);

        if (!this.isEmpty()) {
            this._head.prev = node;
            node.next = this._head;
        }

        this._head = node;
        if (this.isEmpty()) {
            this._tail = node;
        }

        this.size += 1;
        this._arrayIsUpdated = false;
        return this;
    }

    append(value) {
        const node = new LinkedListNode(value);

        if (!this.isEmpty()) {
            this._tail.next = node;
            node.prev = this._tail;
        }

        this._tail = node;
        if (this.isEmpty()) {
            this._head = node;
        }

        this.size += 1;
        this._arrayIsUpdated = false;
        return this;
    }

    insertBefore(nextNode, value) {
        const node = new LinkedListNode(value);

        nextNode.prev = node;
        node.next = nextNode;

        if (nextNode === this._head) {
            this._head = node;
        } else {
            const prevNode = nextNode.prev;
            prevNode.next = node;
            node.prev = prevNode;
        }

        this.size += 1;
        this._arrayIsUpdated = false;
        return this;
    }

    insertAfter(prevNode, value) {
        const node = new LinkedListNode(value);

        prevNode.next = node;
        node.prev = prevNode;

        if (prevNode === this._tail) {
            this._tail = node;
        } else {
            const nextNode = prevNode.next;
            nextNode.prev = node;
            node.next = nextNode;
        }

        this.size += 1;
        this._arrayIsUpdated = false;
        return this;
    }

    insertAt(value, position = 0) {
        if (position <= -this.size || position === 0) {
            return this.prepend(value);
        }
        if (position >= this.size || position === -0) {
            return this.append(value);
        }

        // Positive counts from the head, negative counts from the tail
        if (position > 0) {
            let nextNode = this._head.next;
            for (let i = 1; i < position; i += 1) {
                nextNode = nextNode.next;
            }
            return this.insertBefore(nextNode, value);
        } else {
            let prevNode = this._tail.prev;
            for (let i = -1; i > position; i -= 1) {
                prevNode = prevNode.prev;
            }
            return this.insertAfter(prevNode, value);
        }
    }

    removeHead() {
        if (this._head === null) {
            return undefined;
        }

        const value = this._head.value;
        this._head = this._head.next;
        this.size -= 1;
        this._arrayIsUpdated = false;
        return value;
    }

    removeTail() {
        if (this._tail === null) {
            return undefined;
        }

        const value = this._tail.value;
        this._tail = this._tail.prev;
        this.size -= 1;
        this._arrayIsUpdated = false;
        return value;
    }

    removeBefore(nextNode) {
        const node = nextNode.prev;
        if (node === null) {
            return undefined;
        }

        const prevNode = node.prev;
        nextNode.prev = prevNode;
        if (prevNode !== null) {
            prevNode.next = nextNode;
        }

        this.size -= 1;
        this._arrayIsUpdated = false;
        return node.value;
    }

    removeAfter(prevNode) {
        const node = prevNode.next;
        if (node === null) {
            return undefined;
        }

        const nextNode = node.next;
        prevNode.next = nextNode;
        if (nextNode !== null) {
            nextNode.prev = prevNode;
        }

        this.size -= 1;
        this._arrayIsUpdated = false;
        return node.value;
    }

    removeAt(position = 0) {
        if (position <= -this.size || position === 0) {
            return this.removeHead();
        }
        if (position >= this.size || position === -0) {
            return this.removeTail();
        }

        // Positive counts from the head, negative counts from the tail
        if (position > 0) {
            let nextNode = this._head.next;
            for (let i = 1; i < position; i += 1) {
                nextNode = nextNode.next;
            }
            return this.removeBefore(nextNode);
        } else {
            let prevNode = this._tail.prev;
            for (let i = -1; i > position; i -= 1) {
                prevNode = prevNode.prev;
            }
            return this.removeAfter(prevNode);
        }
    }


    /** Array.prototype methods */

    // Fast, Mutable version; mutates all involved lists
    concat(...lists) {
        for (const list of lists) {
            if (!(list instanceof LinkedList)) {
                this.append(list);
            } else {
                this._tail.next = list._head;
                list._head.prev = this._tail;
                this._tail = list._tail;
                list._head = this._head;
                this.size = list.size = this.size + list.size;
            }
        }
        this._arrayIsUpdated = false;
        return this;
    }
    // Slow, Immutable version
    /*concat(...lists) {
        const output = LinkedList.clone(this);
        for (const list of lists) {
            for (const value of list) {
                output.append(value);
            }
        }
        this._arrayIsUpdated = false;
        return output;
    }*/

    copyWithin(target, start = 0, end = this.size) {
        if (target >= this.size || start >= this.size) {
            return this;
        }
        if (start < 0) {
            start += this.size;
        }
        if (end < 0) {
            end += this.size;
        }

        const values = [];
        let position = 0;
        let fromNode = this._head;
        while (position < start) {
            position += 1;
            fromNode = fromNode.next;
        }
        while (position < end) {
            values.push(fromNode.value);
            fromNode = fromNode.next;
        }

        position = 0;
        let toNode = this._head;
        while (position < target) {
            position += 1;
            toNode = toNode.next;
        }
        while (position < end && position < this.size) {
            toNode.value = values[position - target];
            toNode = toNode.next;
            position += 1;
        }

        this._arrayIsUpdated = false;
        return this;
    }

    * entries() {
        if (this._arrayIsUpdated) {
            yield* this._array.entries();
        } else {
            yield* [...this].entries();
        }
    }

    every(callback, thisArg = undefined) {
        for (const [index, value] of this.entries()) {
            callback.call(thisArg, value, index, this);
        }
    }

    fill(value, start = 0, end = this.size) {
        if (start < 0) {
            start += this.size;
        }
        if (end < 0) {
            end += this.size;
        }

        let position = 0;
        let toNode = this._head;
        while (position < start) {
            position += 1;
            toNode = toNode.next;
        }
        while (position < end && position < this.size) {
            toNode.value = value;
            toNode = toNode.next;
            position += 1;
        }

        this._arrayIsUpdated = false;
        return this;
    }

    filter(callback, thisArg = undefined) {
        const newList = new LinkedList();
        for (const [index, value] of this.entries()) {
            if (callback.call(thisArg, value, index, this)) {
                newList.append(value);
            }
        }
        return newList;
    }

    find(callback, thisArg = undefined) {
        for (const [index, value] of this.entries()) {
            if (callback.call(thisArg, value, index, this)) {
                return value;
            }
        }
        return undefined;
    }

    findPosition(callback, thisArg = undefined) {
        for (const [index, value] of this.entries()) {
            if (callback.call(thisArg, value, index, this)) {
                return index;
            }
        }
        return -1;
    }

    flat(depth = 1) {
        // TODO
    }

    flatMap(callback, thisArg = undefined) {
        return this.map(callback, thisArg).flat();
    }

    forEach(callback, thisArg = undefined) {
        for (const [index, value] of this.entries()) {
            callback.call(thisArg, value, index, this);
        }
    }

    includes(valueToFind, fromIndex = 0) {
        if (fromIndex < 0) {
            fromIndex += this.size;
        }

        if (this._arrayIsUpdated) {
            return this._array.includes(valueToFind, fromIndex);
        }

        for (const value of [...this].slice(fromIndex)) {
            if (value === valueToFind) {
                return true;
            }
        }
        return false;
    }

    indexOf(searchElement, fromIndex = 0) {
        if (fromIndex >= this.size) {
            return -1;
        }
        if (fromIndex < 0) {
            fromIndex += this.size;
        }

        for (const [index, value] of this.entries()) {
            if (index >= fromIndex && value === searchElement) {
                return index;
            }
        }
        return -1;
    }

    join(separator = ',') {
        if (this._arrayIsUpdated) {
            return this._array.join(separator);
        }

        return [...this].join(separator);
    }



    // TODO: Return LinkedList instead of Array
    map(callback, thisArg = undefined) {
        const results = [];
        for (const [index, value] of this.entries()) {
            results.push(callback.call(thisArg, value, index, this));
        }
        return results;
    }

    * [Symbol.iterator]() {
        for (let node = this._head; node !== null; node = node.next) {
            yield node.value;
        }
    }

    // includes(value) {
    //     let node = this._head;
    //     while (node !== null && value !== node.value) {
    //         node = node.next;
    //     }
    //     return value === node?.value;
    // }
    //
    // find(callback = id) {
    //     let node = this._head;
    //     for (let position = 0; node !== null && !callback(node.value, position, this); position += 1) {
    //         node = node.next;
    //     }
    //     return node?.value;
    // }
    //
    // findPosition(callback = id) {
    //     let position = 0;
    //     for (let node = this._head; node !== null && !callback(node.value, position, this); node = node.next) {
    //         position += 1;
    //     }
    //     return position < this.size ? position : undefined;
    // }
    //
    // forEach(callback = id) {
    //     let position = 0;
    //     for (const value of this) {
    //         callback(value, position, this);
    //         position += 1;
    //     }
    // }
    //
    // map(callback = id) {
    //     const results = [];
    //     for (let node = this._head, position = 0; node !== null; node = node.next, position += 1) {
    //         results.push(callback(node.value, position, this));
    //     }
    //     return results;
    // }
    //
    // filter(callback = id) {
    //     const newList = new LinkedList();
    //     let position = 0;
    //     for (let node = this._head; node !== null; node = node.next) {
    //         if (callback(node.value, position, this)) {
    //             newList.append(node.value);
    //         }
    //         position += 1;
    //     }
    //     return newList;
    // }
}


/* queue.js
import { LinkedList } from './linked-list';

// FIFO
export class Queue {
    constructor() {
        this.list = new LinkedList();
    }

    get size() {
        return this.list.size;
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    enqueue(value) {
        this.list.append(value);
        return this;
    }

    dequeue() {
        return this.list.removeHead();
    }
}
*/
