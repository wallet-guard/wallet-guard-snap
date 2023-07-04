export const formatToEightDecimals = (inputString: string): string => {
  const numberValue = parseFloat(inputString);

  if (isNaN(numberValue)) {
    return '0';
  }

  return Number(numberValue.toFixed(8)).toString();
};
