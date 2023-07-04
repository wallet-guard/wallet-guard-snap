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

export const isDashboard = (url: string): boolean => {
  const regex = /^https:\/\/dashboard\.walletguard\.app(\/.*)?$/u;

  return regex.test(url);
};
