import { parseInput } from './parseInput.js';

const input = parseInput('input1.txt');

part1();
part2();

function part2() {
    const candidatesSet = new Set();
    for (const [a, b] of input) {
        candidatesSet.add(a);
        candidatesSet.add(b);
    }

    const getRelated = (item) =>
        input
            .filter((e) => e.includes(item))
            .map(([a, b]) => (a === item ? b : a));

    const filterOutRelated = (arr, item) => {
        const related = getRelated(item);
        return arr.filter((e) => related.includes(e));
    };

    const candidates = Array.from(candidatesSet);
    const cliques = [];

    const extend = (compsub, candidates, not) => {
        if (candidates.length == 0 && not.length == 0) {
            cliques.push(compsub);
            return;
        }
        for (const candidate of candidates) {
            const newCandidates = filterOutRelated(candidates, candidate);
            const newNot = filterOutRelated(candidates, candidate);

            extend([...compsub, candidate], newCandidates, newNot);

            candidates = candidates.filter((e) => e !== candidate);
            not = [...not, candidate];
        }
    };

    extend([], candidates, []);
    cliques.sort((a, b) => b.length - a.length);

    console.log(
        'biggestCircle',
        cliques[0].sort((a, b) => a.localeCompare(b)).join(','),
    );
}

function part1() {
    const getAllCircles = () => {
        const circlesArr = [];

        for (let i = 0; i < input.length; i++) {
            const circle = [...input[i]];

            for (let j = 0; j < input.length; j++) {
                if (i === j) continue;

                if (input[j].includes(circle[0])) {
                    const secondElement = input[j].find((e) => e !== circle[0]);

                    for (let k = 0; k < input.length; k++) {
                        if (
                            input[k].includes(secondElement) &&
                            input[k].includes(circle[1])
                        ) {
                            circlesArr.push([
                                circle[0],
                                secondElement,
                                circle[1],
                            ]);
                        }
                    }
                } else if (input[j].includes(circle[1])) {
                    const secondElement = input[j].find((e) => e !== circle[1]);

                    for (let k = 0; k < input.length; k++) {
                        if (
                            input[k].includes(secondElement) &&
                            input[k].includes(circle[0])
                        ) {
                            circlesArr.push([
                                circle[0],
                                secondElement,
                                circle[1],
                            ]);
                        }
                    }
                }
            }
        }

        return circlesArr;
    };

    function removeDuplicatesFromArrayofArrays(arr) {
        const seen = new Set();
        const result = [];

        for (const subArr of arr) {
            const subArrString = JSON.stringify(subArr.sort());
            if (!seen.has(subArrString)) {
                seen.add(subArrString);
                result.push(subArr);
            }
        }

        return result;
    }

    const isStartsFromT = (item) => {
        for (let i = 0; i < item.length; i++) {
            if (item[i][0] === 't') {
                return true;
            }
        }
        return false;
    };

    const circlesWithDuplicates = getAllCircles();
    const data = removeDuplicatesFromArrayofArrays(circlesWithDuplicates);
    const res = data.filter(isStartsFromT);

    console.log(res.length);
}
