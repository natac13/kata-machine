function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

/**
 * @return the index of the pivot
 */
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;

    // walk from the low to the high but not including the high
    // as the high is the pivot
    // [8, 7, 6, 4, 5]
    // 8 < 5 ? no
    // 7 < 5 ? no
    // 6 < 5 ? no
    // 4 < 5 ? yes therefore increment idx and swap 4(i) with 8(idx)
    // [4, 7, 6, 8, 5]
    // then;
    for (let i = lo; i < hi; i++) {
        // compare each element to the pivot
        if (arr[i] < pivot) {
            idx++;
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
            // [arr[idx], arr[i]] = [arr[i], arr[idx]];
        }
    }
    // the last thing is to move the pivot into the right place
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

export default function quick_sort(arr: number[]): void {
    return qs(arr, 0, arr.length - 1);
}

export function quick_sort_immutable_array(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [
        ...quick_sort_immutable_array(left),
        pivot,
        ...quick_sort_immutable_array(right),
    ];
    // return quick_sort_immutable_array(left).concat(
    //     pivot,
    //     quick_sort_immutable_array(right),
    // );
}
