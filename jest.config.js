module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    preset: "ts-jest",
    testTimeout: 11111,
    coveragePathIgnorePatterns: [
      "node_modules"
    ],
    testEnvironment: 'node',
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };
