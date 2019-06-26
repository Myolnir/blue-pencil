module.exports = {
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/config/**/**',
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  reporters: [
    'default',
    ['../../node_modules/jest-html-reporter', {
      pageTitle: 'Test Report: {{NAME}}',
    }],
  ],
  coverageReporters: [
    'html',
    'json-summary',
    'json',
    'lcov',
    'text-summary',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  testRegex: '\\.(unit|func)\\.js$',
};
