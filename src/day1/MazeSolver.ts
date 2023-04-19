const dir = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0], // right
];

function walk<Point extends { x: number; y: number }>(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // 1. Off the grid
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // 2. on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // 3. At end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // 4. Already visited
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // 3 steps to recursion

    // pre
    // we are going to visit this node
    seen[curr.y][curr.x] = true;
    // add to the path
    path.push(curr);
    // recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    // post
    // if we get here, we have failed to find a path
    // so we need to backtrack by removing the current node from the path
    path.pop();
    return false;
}

export default function solve<Point extends { x: number; y: number }>(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[i].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
