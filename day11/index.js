const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const arr = input.split(' ').map((x) => parseInt(x));

console.log(arr);

const part1_sol3 = (arr) => {
    let allNumbers = new Map();

    for (let num of arr) {
        if (!allNumbers.has(num)) {
            allNumbers.set(num, 1);
        } else {
            allNumbers.set(num, allNumbers.get(num) + 1);
        }
    }

    for (let i = 0; i < 75; i++) {
        //console.log(allNumbers.size);
        let newNumbersSet = new Map();

        allNumbers.forEach((value, key) => {
            let newNumbers = [];
            if (key === 0) {
                newNumbers.push(1);
            } else {
                let digitCount = Math.floor(Math.log10(key)) + 1;
                if (digitCount % 2 === 0) {
                    let digitDivider = Math.pow(10, digitCount / 2);
                    newNumbers.push(Math.floor(key / digitDivider));
                    newNumbers.push(key % digitDivider);
                } else {
                    newNumbers.push(key * 2024);
                }
            }
            for (let num of newNumbers) {
                if (!newNumbersSet.has(num)) {
                    newNumbersSet.set(num, value);
                } else {
                    newNumbersSet.set(num, newNumbersSet.get(num) + value);
                }
            }
        });

        allNumbers = newNumbersSet;
    }

    let count = 0;
    allNumbers.forEach((value, key) => {
        count += value;
    });

    console.log(count);
};

const part1_sol1 = (arr) => {
    const updateArray = (arr) => {
        const newArr = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                newArr.push(1);
                continue;
            }
            // if even number of digits in number
            if (arr[i].toString().length % 2 === 0) {
                const str = arr[i].toString();
                const [left, right] = [
                    parseInt(str.slice(0, str.length / 2)),
                    parseInt(str.slice(str.length / 2)),
                ];
                newArr.push(left);
                newArr.push(right);
                continue;
            }

            newArr.push(arr[i] * 2024);
        }

        return newArr;
    };

    let output = [...arr];
    for (let i = 0; i < 75; i++) {
        output = updateArray(output);
    }

    console.log(output.length);
};

const part1_sol2 = async (arr) => {
    let output = [...arr];
    for (let i = 0; i < 75; i++) {
        console.log(i + 1);
        output = await updateArray(output);
    }

    console.log(output.reduce((acc, item) => acc + item.length, 0));
};

const updateArray = async (arr) => {
    const data = await Promise.all(arr.map((item) => arrayProcessor(item)));
    const newArr = data.reduce((acc, item) => acc.concat(item), []);

    return newArr;
};

const arrayProcessor = async (arr) => {
    const newArr = [[]];

    for (let k = 0; k < arr.length; k++) {
        if (newArr[newArr.length - 1].length >= CHUNK_SIZE) {
            newArr.push([]);
        }
        if (arr[k] === 0) {
            newArr[newArr.length - 1].push(1);
            continue;
        }

        let digitCount = Math.floor(Math.log10(arr[k])) + 1;
        if (digitCount % 2 === 0) {
            let digitDivider = Math.pow(10, digitCount / 2);
            newArr[newArr.length - 1].push(Math.floor(arr[k] / digitDivider));
            newArr[newArr.length - 1].push(arr[k] % digitDivider);

            continue;
        }

        newArr[newArr.length - 1].push(arr[k] * 2024);
    }

    //console.log("newArr:", newArr);
    return newArr;
};

console.time('part1');
part1_sol3(arr);
console.timeEnd('part1');
