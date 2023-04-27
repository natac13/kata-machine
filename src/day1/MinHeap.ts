export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        // we set the length to be one less than the current length
        // as we are going to remove the root node
        // and heapify down uses the length to determine when to stop
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        // take the last element in the array and put it in the root
        // then heapify down, which will put the new root in the correct position
        // which self balances the heap
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    // get a node's parent index in the array
    private parentIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    // get a node's left child index in the array
    private leftChildIdx(idx: number): number {
        return 2 * idx + 1;
    }

    // get a node's right child index in the array
    private rightChildIdx(idx: number): number {
        return 2 * idx + 2;
    }

    private swap(idx1: number, idx2: number): void {
        // const temp = this.data[idx1];
        // this.data[idx1] = this.data[idx2];
        // this.data[idx2] = temp;
        [this.data[idx1], this.data[idx2]] = [this.data[idx2], this.data[idx1]];
    }

    private heapifyUp(idx: number): void {
        if (idx <= 0) {
            return;
        }

        const parentIdx = this.parentIdx(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        // as this is a min heap,
        // when the parent is larger than the current value,
        // we swap the parent and the current value in the array
        // and continue to heapify up until the base case is reached
        if (parentValue > value) {
            this.swap(parentIdx, idx);
            this.heapifyUp(parentIdx);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx > this.length) {
            return;
        }

        const lIdx = this.leftChildIdx(idx);
        const rIdx = this.rightChildIdx(idx);

        // since we alway fill in the heap from left to right,
        // if the left child index is larger than the length of the array,
        // it means that the current node has no children
        // and we can return
        if (lIdx >= this.length) {
            return;
        }

        const lValue = this.data[lIdx];
        const rValue = this.data[rIdx];
        const value = this.data[idx];

        const minValue = Math.min(lValue, rValue);

        // if the current value is larger than the min value of its children,
        // we swap the current value with the min value
        if (minValue < value) {
            // if the min value is the left child,
            if (minValue === lValue) {
                this.swap(lIdx, idx);
                this.heapifyDown(lIdx);
            } else {
                // if the min value is the right child,
                this.swap(rIdx, idx);
                this.heapifyDown(rIdx);
            }
        } else {
            // if the current value is smaller than the min value of its children,
            // we can return
            return;
        }

        // while (this.leftChildIdx(idx) < this.length) {
        //     let smallerChildIdx = this.leftChildIdx(idx);
        //     if (
        //         this.rightChildIdx(idx) < this.length &&
        //         this.data[this.rightChildIdx(idx)] < this.data[smallerChildIdx]
        //     ) {
        //         smallerChildIdx = this.rightChildIdx(idx);
        //     }
        //     if (this.data[idx] < this.data[smallerChildIdx]) {
        //         break;
        //     }
        //     this.swap(idx, smallerChildIdx);
        //     idx = smallerChildIdx;
        // }
    }
}
