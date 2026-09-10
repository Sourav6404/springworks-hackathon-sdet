module.exports = {
  forceExit: true,
  projects: [
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['**/tests/api.test.js']
    },
    {
      displayName: 'ui',
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/ui.test.js']
    }
  ]
};
