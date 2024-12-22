const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim();

const regex = /mul\((\d+),(\d+)\)/g;

const matches = input.matchAll(regex);
let sum = 0;
for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2]);
}

console.log(sum);

const regToFirstDo = /^[\s\S]*?do(?:n't)?\(\)/g;
const regFromFirstDo = /do(?!n't)\(\)[\s\S]*?(?=don't\(\))/g;
const regAfterLastDo = /[\s\S]+do\(\)([\s\S]+)/g;

const matchesStart = input.match(regToFirstDo);
const otherMatches = input.match(regFromFirstDo);
const matchesEnd = input.matchAll(regAfterLastDo);

let combinedToString = matchesStart[0] + otherMatches.join('');
for (const match of matchesEnd) {
    combinedToString += match[1];
}

const matches2 = combinedToString.matchAll(regex);
let sum2 = 0;
for (const match of matches2) {
    sum2 += parseInt(match[1]) * parseInt(match[2]);
}

console.log(sum2);

const regUniversal = /do(?!n't)\(\)[\s\S]*?(?=don't\(\))/g;

const allMatches = `do()${input}don't()`.match(regUniversal);
const matches3 = allMatches.toString().matchAll(regex);

let sum3 = 0;
for (const match of matches3) {
    sum3 += parseInt(match[1]) * parseInt(match[2]);
}

console.log(sum3);
