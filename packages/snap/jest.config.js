module.exports = {
  preset: '@metamask/snaps-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  rootDir: './src/__tests__',
  modulePathIgnorePatterns: ['<rootDir>/mocks/'],
};
