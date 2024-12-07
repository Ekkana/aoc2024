const findAnswer = (arr, curIndex, prevValue, result, operationFunc) => {
  if (arr.length === curIndex) {
    return prevValue === result;
  }

  const curVal = operationFunc(prevValue, arr[curIndex]);
  if (curVal > result) {
    return false;
  }

  return (
    findAnswer(arr, curIndex + 1, curVal, result, sum) ||
    findAnswer(arr, curIndex + 1, curVal, result, mul) ||
    findAnswer(arr, curIndex + 1, curVal, result, concat)
  );
};

const sum = (a, b) => a + b;
const mul = (a, b) => a * b;
const concat = (a, b) => parseInt(`${a}${b}`);
