// this is assuming the list is sorted
// worst
export default function bs_list(haystack: number[], needle: number): boolean {
    const mid = Math.floor(haystack.length / 2);

    if (haystack[mid] === needle) {
        return true;
    }

    if (haystack.length === 1) {
        return false;
    }

    if (haystack[mid] > needle) {
        return bs_list(haystack.slice(0, mid), needle);
    }

    return bs_list(haystack.slice(mid), needle);
}

// second
export function primeSearch(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;
    do {
        const mid = Math.floor(lo + (hi - lo) / 2);
        const value = haystack[mid];

        if (value === needle) {
            return true;
        }

        if (value > needle) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    } while (lo < hi);

    return false;
}

// best
export function googleSearch(haystack: number[], needle: number): boolean {
    let left = 0;
    let right = haystack.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (haystack[mid] === needle) {
            return true;
        }
        if (needle < haystack[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return false;
}
