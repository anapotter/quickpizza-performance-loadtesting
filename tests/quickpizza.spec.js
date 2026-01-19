const { test, expect } = require('@playwright/test');

test.describe('QuickPizza Performance', () => {
  test('homepage loads successfully', async ({ page }) => {
    // Start tracing for performance debugging
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Basic assertions
    await expect(page).toHaveTitle(/QuickPizza|Pizza/i);
    
    // Check that main content is visible
    const isVisible = await page.locator('body').isVisible();
    expect(isVisible).toBeTruthy();
    
    // Stop tracing and save
    await page.context().tracing.stop({ path: 'reports/trace-homepage.zip' });
  });
  
  test('measure page load metrics', async ({ page }) => {
    await page.goto('/');
    
    // Get performance metrics
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    
    const pageLoadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
    
    // Assert reasonable load time (under 5 seconds)
    expect(pageLoadTime).toBeLessThan(5000);
  });
});
