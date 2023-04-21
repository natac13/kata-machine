// bubble sort will bubble the highest number to the end of the array
// on each pass through the array
// therefore we know that each pass through the array we can ignore
// the last elements in the array based on the number of passes
export default function bubble_sort(arr: number[]): void {
    const len = arr.length;
    let didSwap = true;

    // we know that the last element in the array will be the highest
    // so we can ignore it on the next pass through the array
    // therefore we can reduce the length of the array by 1
    // on each pass through the array
    // [3, 2, 1, 7, 5, 6]: i = 0; j <= 6 -1 - 0 = 5
    // [2, 1, 3, 5, 6, 7]
    // [1, 2, 3, 5, 6, 7]
    for (let i = 0; didSwap && i < len; i++) {
        // if we didn't swap any elements in the inner loop
        // then we know that the array is sorted
        didSwap = false;
        // the inner loop goes to the length minus 1 since we never want j to be the last element
        // in the array since we are comparing the current element to the next element
        // also we minus i since each pass through the array we know that the last i elements
        // are sorted
        for (let j = 0; j < len - 1 - i; j++) {
            // if the current element is greater than the next element
            // then swap them
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]; // save the current element
                arr[j] = arr[j + 1]; // set the current element to the next element
                arr[j + 1] = temp; // set the next element to the current element
                didSwap = true; // we swapped elements so set didSwap to true
            }
        }
    }
}
