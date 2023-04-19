type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
};
export default class Stack<T> {
    public length: number;
    // private is a TS keyword, but this is only a complier hint
    // nothing is enforced at runtime
    private _head?: StackNode<T>;

    // this is real JS syntax which creates a property with a
    // WeekMap under the hood.
    // This will enforce the type at runtime
    // https://github.com/microsoft/TypeScript/pull/30829
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    //    #_head?: StackNode<T>;

    constructor() {
        this.length = 0;
        this._head = undefined;
    }

    push(item: T): void {
        const node: StackNode<T> = {
            value: item,
            next: this._head,
        };

        this._head = node;
        this.length++;
    }

    pop(): T | undefined {
        if (this._head === undefined) {
            return undefined;
        }

        const node = this._head;
        this._head = node.next;
        this.length--;
        return node.value;
    }

    peek(): T | undefined {
        return this._head?.value;
    }
}
