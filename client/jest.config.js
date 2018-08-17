module.exports = {
  clearMocks: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  restoreMocks: true,
  setupTestFrameworkScriptFile: './spec/setup-tests.js',
  testMatch: ['**/*-spec.js'],
  testPathIgnorePatterns: ['node_modules'],
  testURL: 'http://localhost',
  transform: { '\\.js$': 'babel-jest' },
};
