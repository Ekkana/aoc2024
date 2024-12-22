import { parseInput } from './parseInput.js';

const [towels, target] = parseInput('input1.txt');

console.time('part2_sol3');
part2_sol3();
console.timeEnd('part2_sol3');

function part2_sol3() {
    const canCombine = (target, towels, currentStr = '', count = 0, visited = {}) => {
        if (typeof visited[currentStr] !== 'undefined') {
            console.log('returning from visited', currentStr, visited[currentStr]);
            return visited[currentStr];
        }

        if (currentStr === target) {
            return count + 1;
        }

        if (!target.startsWith(currentStr)) {
            return count;
        }

        let total = 0;

        for (let i = 0; i < towels.length; i++) {
            const newStr = currentStr + towels[i];
            total += canCombine(target, towels, newStr, count, visited);
        }

        console.log('adding to visited', currentStr, total);
        visited[currentStr] = total;

        return total;
    };

    let count = 0;

    for (let i = 0; i < 2; i++) {
        let data = canCombine(target[i], towels);
        console.log('-------------------');
        console.log(data);
        count += data;
    }

    console.log(count);
}

function part2_sol2() {
    const canCombine = (target, towels, currentStr, count, visited) => {
        if (currentStr === target) {
            return count + 1;
        }

        if (!target.startsWith(currentStr)) {
            visited[currentStr] = false;
            return count;
        }

        visited[currentStr] = true;

        let total = 0;

        for (let i = 0; i < towels.length; i++) {
            const newStr = currentStr + towels[i];
            total += canCombine(target, towels, newStr, count, visited);
        }

        console.log(visited);

        return total;
    };

    let count = 0;

    for (let i = 0; i < target.length; i++) {
        const towelsObject = towels.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
        }, {});
        let data = canCombine(target[i], towels, '', 0, towelsObject);
        count += data;
        console.log(data);
    }

    console.log(count);
}

//console.time("part2");
//part2();
//console.timeEnd("part2");

function part2() {
    const canCombine = (target, towels, currentStr, count, visited) => {
        if (currentStr === target) {
            return count + 1;
        }

        let total = 0;

        for (let i = 0; i < towels.length; i++) {
            const newStr = currentStr + towels[i];
            if (target.startsWith(newStr)) {
                total += canCombine(target, towels, newStr, count, visited);
            }
        }

        return total;
    };

    let count = 0;

    for (let i = 0; i < target.length; i++) {
        const visited = [];
        let data = canCombine(target[i], towels, '', 0, visited);
        count += data;
        console.log(data);
    }

    console.log(count);
}

console.time('part1');
part1();
console.timeEnd('part1');

function part1() {
    const canCombine = (target, towels, currentStr) => {
        if (currentStr === target) {
            return true;
        }
        if (!target.startsWith(currentStr)) {
            return false;
        }
        if (currentStr.length > target.length) {
            return false;
        }

        for (let i = 0; i < towels.length; i++) {
            if (canCombine(target, towels, currentStr + towels[i])) {
                return true;
            }
        }

        return false;
    };

    let count = 0;

    for (let i = 0; i < target.length; i++) {
        if (canCombine(target[i], towels, '')) {
            count++;
        }
    }

    console.log(count);
}
