function sliceArr(arr, from, to, leng) {
    return arr.slice(from, from + Math.min(leng, to - from));
}

// Example usage
const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = sliceArr(inputArray, 2, 6, 3);
console.log(result); // Output: [3, 4, 5]
