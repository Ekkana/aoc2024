const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input2.txt"), "utf8")
  .toString()
  .trim();

const splitLines = input.split("\n");
const arr = splitLines.map((line) => [
  parseInt(line.split(": ")[0]),
  line.split(": ")[1].split(" "),
]);

const part1 = () => {
  const output = [];
  const operations = ["+", "*"];
  for (let i = 0; i < arr.length; i++) {
    const result = arr[i][0];
    const items = arr[i][1];

    const variants = Math.pow(operations.length, items.length - 1);

    let resultStr = "";
    for (let j = 0; j < variants; j++) {
      let current = j;
      resultStr += items[0];

      for (let k = 1; k < items.length; k++) {
        const op = operations[current % operations.length];
        const value = items[k];
        resultStr = eval(`${resultStr}${op}${value}`);
        //current = Math.floor(current / operations.length);
        current++;
      }

      if (resultStr === result) {
        output.push(result);
        break;
      } else {
        resultStr = "";
      }
    }
    resultStr = "";
  }

  console.log(output.reduce((acc, curr) => acc + curr, 0));
};

console.time("part1");
part1();
console.timeEnd("part1");

const part2 = () => {
  const output = [];
  const operations = ["+", "*", "|"];
  for (let i = 0; i < arr.length; i++) {
    const result = arr[i][0];
    const items = arr[i][1];

    const variants = Math.pow(operations.length, items.length - 1);
    let resultStr = "";

    for (let j = 0; j < variants; j++) {
      let current = j;
      resultStr += items[0];

      for (let k = 1; k < items.length; k++) {
        const op = operations[current % operations.length];
        const value = items[k];

        if (op === "|") {
          resultStr = `${resultStr}${value}`;
        } else {
          resultStr = eval(`${resultStr}${op}${value}`);
        }

        current = Math.floor(current / operations.length);
      }

      if (resultStr == result) {
        output.push(result);
        break;
      }
      resultStr = "";
    }
    resultStr = "";
  }
};

console.time("part2");
part2();
console.timeEnd("part2");
