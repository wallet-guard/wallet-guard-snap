module.exports = {
  preset: '@metamask/snaps-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  rootDir: './',
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/mocks/*',
    '<rootDir>/src/__tests__/coverage/*',
  ],
};
