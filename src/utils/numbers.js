const getNextElementInArray = () => {};

const generateRandomNumberInRange = (n) => {
  const randomNumber = Math.random() * 10;
  const modRange = Math.round(randomNumber) % n;
  return modRange;
};

const calculateTotal = (input = [], key = "value") =>
  input.reduce((sum, item) => {
    const value = item[key] || 0;
    return Number(value) + sum;
  }, 0);

export { getNextElementInArray, generateRandomNumberInRange, calculateTotal };
