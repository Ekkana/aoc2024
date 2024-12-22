const path = require('path');
const fs = require('fs');

const inputRules = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const inputRecord = fs.readFileSync(path.join(__dirname, 'input2.txt'), 'utf8').toString().trim();

const rulesSplitLines = inputRules.split('\n');
const rulesArr = rulesSplitLines.map((line) => line.split('|'));
const rulesObj = rulesArr.reduce((acc, rule) => {
    const [key, value] = rule;
    if (!acc[value]) {
        acc[value] = [];
    }
    acc[value].push(key);
    return acc;
}, {});

const recordSplitLines = inputRecord.split('\n');
const recordArr = recordSplitLines.map((line) => line.split(','));

const successArray = [];
const failArray = [];
for (let i = 0; i < recordArr.length; i++) {
    let isAdd = true;
    for (let k = 0; k < recordArr[i].length; k++) {
        if (Object.keys(rulesObj).includes(recordArr[i][k])) {
            for (let j = k; j < recordArr[i].length; j++) {
                if (rulesObj[recordArr[i][k]].includes(recordArr[i][j])) {
                    isAdd = false;
                    break;
                }
            }
        }
    }
    if (isAdd) {
        successArray.push(recordArr[i]);
    } else {
        failArray.push(recordArr[i]);
    }
}

const sumOfSuccessMiddlePoints = successArray.reduce((acc, record) => {
    const middleIndex = Math.floor(record.length / 2);
    return acc + parseInt(record[middleIndex]);
}, 0);

console.log(sumOfSuccessMiddlePoints);

// Part 2
for (let i = 0; i < failArray.length; i++) {
    for (let k = 0; k < failArray[i].length; k++) {
        if (Object.keys(rulesObj).includes(failArray[i][k])) {
            for (let j = k; j < failArray[i].length; j++) {
                if (
                    rulesObj[failArray[i][k]] &&
                    rulesObj[failArray[i][k]].includes(failArray[i][j])
                ) {
                    const temp = failArray[i][j];
                    failArray[i][j] = failArray[i][k];
                    failArray[i][k] = temp;
                }
            }
        }
    }
}

const sumOfFailMiddlePoints = failArray.reduce((acc, record) => {
    const middleIndex = Math.floor(record.length / 2);
    return acc + parseInt(record[middleIndex]);
}, 0);

console.log(sumOfFailMiddlePoints);
