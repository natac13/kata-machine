import bsSearch, {
    googleSearch,
    primeSearch,
} from "./src/day1/BinarySearchList";

const haystackLenths = [100, 1000, 10_000, 100_000, 1_000_000, 10_000_000];

const haystacks: number[][] = haystackLenths.map((length) => {
    const haystack: number[] = [];
    for (let i = 0; i < length; i++) {
        haystack.push(i);
    }
    return haystack;
});

const needles = [75, 555, 7687, 12_345, 123_456, 1_234_567, 12_345_678];

haystacks.forEach((haystack, idx) => {
    // const needle = Math.floor(Math.random() * haystack.length);
    const needle = needles[idx];
    console.log("\n\n\nneedle", needle);
    console.log("haystack length", haystack.length);
    console.log("-----------------");

    console.log("\n");
    console.time("bsSearch");
    console.log(bsSearch(haystack, needle));
    console.timeEnd("bsSearch");
    console.log("-----------------");

    console.log("\n");
    console.time("primeSearch");
    console.log(primeSearch(haystack, needle));
    console.timeEnd("primeSearch");
    console.log("-----------------");

    console.log("\n");
    console.time("googleSearch");
    console.log(googleSearch(haystack, needle));
    console.timeEnd("googleSearch");
});
