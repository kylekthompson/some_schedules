module.exports = {
  clearMocks: true,
  restoreMocks: true,
  setupTestFrameworkScriptFile: './spec/setup-tests.js',
  testMatch: ['**/*-spec.js'],
  testPathIgnorePatterns: ['node_modules'],
  testURL: 'http://localhost',
  transform: { '\\.js$': 'babel-jest' },
};
