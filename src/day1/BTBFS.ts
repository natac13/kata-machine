import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // const queue: (BinaryNode<number> | null)[] = [head];
    //
    // while (queue.length > 0) {
    //     const node = queue.shift();
    //     if (!node) {
    //         continue;
    //     }
    //
    //     if (node.value === needle) {
    //         return true;
    //     }
    //
    //     queue.push(node.left);
    //     queue.push(node.right);
    // }
    //
    // return false;
    const queue = new Queue<BinaryNode<number> | null>();
    queue.enqueue(head);

    while (queue.length > 0) {
        const node = queue.deque();
        if (!node) {
            continue;
        }

        if (node.value === needle) {
            return true;
        }

        queue.enqueue(node.left);
        queue.enqueue(node.right);
    }

    return false;
}
