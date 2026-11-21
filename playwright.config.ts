import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
const baseURL = `http://localhost:${PORT}`;
const onContinuousIntegration = Boolean(process.env.CI);
const servePreview = `npm run preview -- --port ${PORT} --ignore-lock`;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: onContinuousIntegration,
  retries: onContinuousIntegration ? 1 : 0,
  reporter: onContinuousIntegration ? 'github' : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  webServer: {
    command: onContinuousIntegration ? servePreview : `npm run build && ${servePreview}`,
    url: baseURL,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
