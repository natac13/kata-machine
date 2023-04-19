type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        // if there is no head, make the new node the head and tail
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        }

        // when there is a current head
        // take the current head and make it the next node on the new node
        // as the new node will become the head
        node.next = this.head;
        // take the current head and make it's previous on the new node
        this.head.prev = node;
        // make the new node the head
        this.head = node;
        // increment the length
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        let current = this.head;

        for (let i = 0; current && i < idx; i++) {
            current = current.next;
        }

        const node: Node<T> = {
            value: item,
            next: current, // 1.
            prev: current?.prev, // 2.
        };

        // A -> B -> C
        // A -> D -> B -> C
        // where B is the current node
        // and D is the new node
        //
        // insert the new node before the current node (B)
        // 1. so the new node's next is the current node; or D.next = B
        // 2. and the new node's previous is the current node's previous; or D.prev = (B.prev = A)
        //
        // then we have to update the current node next & previous
        // 3. the current node's previous next is the new node; or (B.prev = A).next = D
        // 4. the current node's previous is the new node; or B.prev = D

        if (current) {
            if (current.prev) {
                current.prev.next = node; // 3.
            }
            current.prev = node; // 4.
        }
        this.length++;
    }

    append(item: T): void {
        if (!this.tail) {
            this.tail = { value: item };
            this.head = this.tail;
        }

        const node = { value: item, prev: this.tail };
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }

    remove(item: T): T | undefined {}

    get(idx: number): T | undefined {}

    removeAt(idx: number): T | undefined {}
}
