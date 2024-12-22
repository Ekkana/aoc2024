const path = require('path');
const fs = require('fs');

const inputRules = fs.readFileSync(path.join(__dirname, 'input1.txt'), 'utf8').toString().trim();

const [reg, inp] = inputRules.split('\n\n');

const regRules = reg.split('\n');

let initA = parseInt(regRules[0].split(': ')[1]);
let initB = parseInt(regRules[1].split(': ')[1]);
let initC = parseInt(regRules[2].split(': ')[1]);
const instructions = inp
    .split(' ')[1]
    .split(',')
    .map((i) => parseInt(i));

console.time('part 2');
part2();
console.timeEnd('part 2');

function part2() {
    let output = [];
    let currentInstruction = 0;
    let regA = initA;
    let regB = initB;
    let regC = initC;

    const comboOperand = () => ({
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: regA,
        5: regB,
        6: regC,
    });

    const instructionsLookup = {
        0: (a) => {
            regA = Math.floor(regA / Math.pow(2, comboOperand()[a]));
            currentInstruction += 2;
        },
        1: (a) => {
            regB = (regB ^ a) & 7;
            currentInstruction += 2;
        },
        2: (a) => {
            regB = comboOperand()[a] % 8;
            currentInstruction += 2;
        },
        3: (a) => (regA === 0 ? (currentInstruction += 2) : (currentInstruction = a)),
        4: () => {
            regB = (regB ^ regC) & 7;
            currentInstruction += 2;
        },
        5: (a) => {
            output.push(comboOperand()[a] % 8);
            currentInstruction += 2;
        },
        6: (a) => {
            regB = Math.floor(regA / Math.pow(2, comboOperand()[a]));
            currentInstruction += 2;
        },
        7: (a) => {
            regC = Math.floor(regA / Math.pow(2, comboOperand()[a]));
            currentInstruction += 2;
        },
    };

    const run = (possibleA) => {
        output = [];
        regA = possibleA;
        regB = 0;
        regC = 0;

        while (currentInstruction < instructions.length) {
            const instruction = instructionsLookup[instructions[currentInstruction]];
            const operand = instructions[currentInstruction + 1];
            instruction(operand);
        }

        return output;
    };

    let a = 0;
    while (true) {
        currentInstruction = 0;

        const out = run(a);
        const start = instructions.length - out.length;
        let isFine = true;

        for (let i = start; isFine && i < instructions.length; i++) {
            if (instructions[i] !== out[i - start]) {
                isFine = false;
            }
        }
        if (isFine && out.length === instructions.length) {
            console.log(a);
            break;
        }

        if (isFine) {
            a *= 8;
        } else {
            a++;
        }
    }
}

//part1();
//function part1() {
//  const output = [];
//  let currentInstruction = 0;
//  const comboOperand = () => ({
//    0: 0,
//    1: 1,
//    2: 2,
//    3: 3,
//    4: regA,
//    5: regB,
//    6: regC,
//  });
//
//  const instructionsLookup = {
//    0: (a) => {
//      regA = Math.floor(regA / Math.pow(2, comboOperand()[a]));
//      currentInstruction += 2;
//    },
//    1: (a) => {
//      regB = regB ^ a;
//      currentInstruction += 2;
//    },
//    2: (a) => {
//      regB = comboOperand()[a] % 8;
//      currentInstruction += 2;
//    },
//    3: (a) =>
//      regA === 0 ? (currentInstruction += 2) : (currentInstruction = a), // do not jump
//    4: () => {
//      regB = regB ^ regC;
//      currentInstruction += 2;
//    },
//    5: (a) => {
//      output.push(comboOperand()[a] % 8);
//      currentInstruction += 2;
//    },
//    6: (a) => {
//      regB = Math.floor(regA / Math.pow(2, comboOperand()[a]));
//      currentInstruction += 2;
//    },
//    7: (a) => {
//      regC = Math.floor(regA / Math.pow(2, comboOperand()[a]));
//      currentInstruction += 2;
//    },
//  };
//
//  while (currentInstruction < instructions.length) {
//    //console.log(currentInstruction, regA, regB, regC, JSON.stringify(output));
//    const instruction = instructionsLookup[instructions[currentInstruction]];
//    const operand = instructions[currentInstruction + 1];
//    instruction(operand);
//  }
//  console.log(regA, regB, regC);
//  console.log(output.join(","));
//}
