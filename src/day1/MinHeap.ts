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
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private parentIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChildIdx(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChildIdx(idx: number): number {
        return 2 * idx + 2;
    }

    private swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const pIdx = this.parentIdx(idx);
        const pValue = this.data[pIdx];
        const value = this.data[idx];

        if (pValue > value) {
            // this.data[pIdx] = value;
            // this.data[idx] = pValue;
            this.swap(pIdx, idx);
            this.heapifyUp(pIdx);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx > this.length) {
            return;
        }

        const lIdx = this.leftChildIdx(idx);
        const rIdx = this.rightChildIdx(idx);

        if (lIdx >= this.length) {
            return;
        }

        const lValue = this.data[lIdx];
        const rValue = this.data[rIdx];
        const value = this.data[idx];

        const minValue = Math.min(lValue, rValue);

        if (minValue < value) {
            if (minValue === lValue) {
                this.swap(lIdx, idx);
                this.heapifyDown(lIdx);
            } else {
                this.swap(rIdx, idx);
                this.heapifyDown(rIdx);
            }
        } else {
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
