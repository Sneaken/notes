/**
 *
 *
 * @param {*} arr
 * @returns
 */
function removeDuplicate(arr) {
    return [...(new Set(arr.map(n => JSON.stringify(n))))].map(n => JSON.parse(n))
}
console.log(removeDuplicate([123, [1, 2, 3],
    [1, "2", 3],
    [1, 2, 3],
    [1, 2, 3]
]));
