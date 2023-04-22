import quick_sort, { quick_sort_immutable_array } from "@code/QuickSort";

test("quick-sort", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    debugger;
    quick_sort(arr);
    console.time("quick-sort");
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
    console.timeEnd("quick-sort");
});

test("quick-sort-immutable-array", function () {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    debugger;
    const out = quick_sort_immutable_array(arr);
    console.time("quick-sort-immutable-array");
    expect(out).toEqual([3, 4, 7, 9, 42, 69, 420]);
    console.timeEnd("quick-sort-immutable-array");
});

function createArray(length: number): number[] {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * length));
    }
    return arr;
}

function createTestingArrays(): number[][] {
    const arrayLenghts = [100_000, 1_000_000, 10_000_000];
    // const arrayLenghts = [100, 1000];

    return arrayLenghts.map((length) => createArray(length));
}

test("Compare quick-sort and quick-sort-immutable-array", function () {
    const testingArrays = createTestingArrays();

    testingArrays.forEach((arr) => {
        const arrCopy = [...arr];
        console.time("quick-sort");
        quick_sort(arr);
        console.timeEnd("quick-sort");

        console.time("quick-sort-immutable-array");
        const out = quick_sort_immutable_array(arrCopy);
        console.timeEnd("quick-sort-immutable-array");
        expect(out).toEqual(arr);
    });
});
