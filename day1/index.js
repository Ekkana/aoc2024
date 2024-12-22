import input from './input.js';

const arr1 = [];
const arr2 = [];

input.split('\n').forEach((x) => {
    var nums = x.split('   ');
    arr1.push(parseInt(nums[0]));
    arr2.push(parseInt(nums[1]));
});

let sum = 0;

for (let i = 0; i < arr1.length; i++) {
    const number = arr1[i];
    const amountOfSameNumbersInArr2 = arr2.filter((x) => x === number).length;

    sum += number * amountOfSameNumbersInArr2;
}

console.log(sum);
