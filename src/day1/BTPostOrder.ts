function walk(node: BinaryNode<number> | null, path: number[]): number[] {
    if (!node) {
        return path;
    }

    //pre

    //recurse
    walk(node.left, path);
    walk(node.right, path);

    //post
    path.push(node.value);
    return path;
}
export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
