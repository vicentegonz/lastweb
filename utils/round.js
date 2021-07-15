/* eslint-disable no-useless-escape */
const zeroDecimal = (value) => {
  if (value.slice(-2, -1) === '00') {
    return value.slice(0, -2);
  }
  if (value.slice(-2) === ',0') {
    return value.slice(0, -2);
  }
  if (value.slice(-1) === '0') {
    return value.slice(0, -1);
  }
  return value;
};

const stripMinus = (value) => {
  if (value.slice(0, 1) === '-') {
    return value.slice(1);
  }
  return value;
};

const round = (value, precision) => {
  const number = stripMinus(
    zeroDecimal(
      value
        .toFixed(precision)
        .replace('.', ',')
        .replace(/\d(?=(\d{3})+\,)/g, '$&.'),
    ),
  );
  return number;
};

export default round;
