const isValidAmount = (amount: string) => {
  if (typeof amount !== 'string') {
    return false;
  }
  return !isNaN(parseFloat(amount));
};

export default isValidAmount;
