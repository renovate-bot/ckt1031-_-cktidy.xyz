const PORT = 4072;

const baseURL = `http://localhost:${PORT}`;

const config = {
  retries: 2,
  testDir: './e2e',
  timeout: 25 * 1000,
  webServer: {
    command: 'pnpm dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: 'retry-with-trace',
    headless: true,
    browserName: 'chromium',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },
};

export default config;
