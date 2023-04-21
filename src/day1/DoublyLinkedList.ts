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
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        // when there is a current head
        // take the current head and make it the next node on the new node
        // as the new node will become the head
        // the old head's previous is the new node
        // whice is the new head
        this.head.prev = node;
        // the new node's next is the old head
        node.next = this.head;
        // the new node is the new head
        this.head = node;
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

        const current = this.getAt(idx);

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

        this.length++;
        if (current) {
            if (current.prev) {
                current.prev.next = node; // 3.
            }
            current.prev = node; // 4.
        }
    }

    append(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        // when there is a current tail
        // take the current tail and make it the previous node on the new node
        // as the new node will become the tail
        // then make the new node the tail
        // increment the length
        // A -> B -> C
        // A -> B -> C -> D
        // where C is the current tail
        // and D is the new node
        // 1. the new node's previous is the current tail; or D.prev = C
        // 2. the current tail's next is the new node; or C.next = D
        // 3. make the new node the tail; or this.tail = D
        // 4. increment the length; or this.length++
        // the old tail's next is the new node
        // whice is the new tail
        this.tail.next = node;
        // the new node's previous is the old tail
        node.prev = this.tail;
        // the new node is the new tail
        this.tail = node;
    }

    remove(item: T): T | undefined {
        // if (this.head?.value === item) {
        //     // if the head is the item to remove
        //     // make the next node the head
        //     // decrement the length
        //     // return the removed item
        //     this.head = this.head.next;
        //     this.length--;
        //     return item;
        // } else if (this.tail?.value === item) {
        //     // if the tail is the item to remove
        //     // make the previous node the tail
        //     // decrement the length
        //     // return the removed item
        //     this.tail = this.tail.prev;
        //     this.length--;
        //     return item;
        // }

        let current = this.head;

        for (let i = 0; current && i < this.length; i++) {
            if (current.value === item) {
                break;
            }
            current = current.next;
        }

        if (!current) {
            return undefined;
        }

        this.length--;

        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        return this.remoteNode(current);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }

        this.length--;
        return this.remoteNode(node);
    }

    private remoteNode(node: Node<T>): T | undefined {
        if (node == this.head) {
            this.head = node.next;
        }

        if (node == this.tail) {
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        // if (!this.length || idx >= this.length || !this.head || !this.tail) {
        //     return undefined;
        // } else if (idx === 0 && this.head) {
        //     return this.head;
        // } else if (idx === this.length - 1) {
        //     return this.tail;
        // }

        let current = this.head;
        if (idx === 0) {
            return current;
        }

        for (let i = 1; current && i <= idx; i++) {
            current = current.next;
        }

        return current;
    }

    print(): void {
        if (!this.length) {
            console.log("empty list");
            return;
        }
        let current = this.head;
        for (let i = 0; current && i < this.length; i++) {
            console.log(
                `[${i}]: ${current.value}, next: ${current.next?.value}, prev: ${current.prev?.value}`,
            );
            current = current.next;
        }
    }
}
