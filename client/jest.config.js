module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: './coverage/',
  restoreMocks: true,
  setupFiles: ['./spec/support/browser-mocks.js'],
  setupTestFrameworkScriptFile: './spec/setup-tests.js',
  testMatch: ['**/*-spec.js'],
  testPathIgnorePatterns: ['node_modules'],
  testURL: 'http://localhost',
  transform: { '\\.js$': 'babel-jest' },
};
