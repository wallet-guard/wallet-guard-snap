export const add3DotsMiddle = (input: string, limit: number) => {
  const dots = '...';
  if (input.length > limit) {
    return (
      input.substring(0, limit) +
      dots +
      input.substring(input.length - 4, input.length)
    );
  }

  return input;
};
