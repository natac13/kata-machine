type QueueItem<T> = {
    value: T;
    next?: QueueItem<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: QueueItem<T>;
    private tail?: QueueItem<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const queueItem: QueueItem<T> = { value: item };

        if (!this.tail) {
            this.head = this.tail = queueItem;
        }

        this.tail.next = queueItem;
        this.tail = queueItem;
        this.length++;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        this.length--;

        if (!this.head) {
            this.tail = undefined;
        }

        return value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
