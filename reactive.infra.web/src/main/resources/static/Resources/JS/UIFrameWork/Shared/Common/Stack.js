export default class Stack extends Array {
    peek() {
        return this[this.length - 1];
    }

    isEmpty() {
        return this.length === 0;
    }

    removeLast() {
        this.splice(this.length - 1, 1);
    }

    removeIndexCount(index, count) {
        this.splice(index, count);
    }

    removeItem(item) {
        let index = this.indexOf(item);
        this.splice(index, 1);
    }
}