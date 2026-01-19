# QuickPizza Performance Testing - Quick Start Guide

## 🚀 Getting Started (5 minutes)

### Step 1: Open the Project
You already have this project open in VS Code. Great!

### Step 2: Verify Setup
Run the following to confirm everything works:

```bash
# Check k6 is installed
k6 version

# Check Node.js is installed
node --version

# Check dependencies
npm list --depth=0
```

### Step 3: Run Your First Test

```bash
npm run test:smoke
```

This will:
- ✅ Run a 15-second smoke test
- ✅ Generate an HTML report
- ✅ Save metrics to JSON
- ✅ Display results in the terminal

### Step 4: View the Report

**Option A: VS Code**
1. Right-click on `reports/smoke-report.html`
2. Select "Open with Live Server" (if you have the extension)
3. Or select "Reveal in Finder" and double-click the file

**Option B: Terminal**
```bash
open reports/smoke-report.html
```

**Option C: Finder**
1. Open Finder
2. Navigate to the project folder
3. Go to `reports/`
4. Double-click `smoke-report.📊 What You'll See in the Report

- **Test Overview** - Summary, duration, VUs
- **Thresholds** - Pass/fail status (all green!)
- **Checks** - Request validations (100% passed)
- **Metrics** - Response times, throughput, error rates
- **Charts** - Visual representation of performance data

## 🎯 Run All Tests

```bash
# Smoke test only (15s)
npm run test:smoke

# Load test only (80s)
npm run test:load

# Playwright tests (browser)
npm run test:pla```

This will:
-
npm test
```

## 📈 Understanding the Results

### Smoke Test Results (Last Run)
- ✅ **All thresholds passed**
- ✅ **0% error rate** (perfect!)
- ✅ **71ms average response time** (excellent)
- ✅ **80ms p95 latency** (well under 800ms threshold)

### What This Means
Your application is:
- 🟢 **Healthy** - All checks passed
- 🟢 **Fast** - Response times well within limits
- 🟢 **Reliable** - Zero errors during testing
- 🟢 **Stable** - Consistent performance

## 🔧 Customize Your Tests

### Change
- **Test Overview** - Summary, duration, VUs
- **Thresholds** un Longer Tests
Edit `tests/smoke.js`:
```javascript
export const options = {
  vus: 1,
  duration: "60s",  // Changed from 15s to 60s
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"],
  },
};
```

### Add More Virtual Users
Edit `tests/load.js`:
```javascript
stages: [
  { duration: "20s", target: 10 },   // More VUs
  { duration: "40s", target: 30 },   // More VUs
  { duration: "20s", target: 0 },
],
```

## 🐛 Troubleshooting

### k6 command not found
```bash
# Install k6 on macOS
brew install k6

# Verify installation
k6 version
```

### npm command not found
```bash
# Install Node.js f
### What This Means
Your application is:
- 🟢 **Hea Reports not generating
```bash
# Create reports directory
mkdir -p reports

# Run test again
npm run test:smoke
```

## 📚 Next Steps

1. **Run the load test**
   ```bash
   npm run test:load
   ```
   Open `reports/load-report.html` to see results

2. **Try Playwright tests**
   ```bash
   npm run test:playwright
   ```
   View browser performance metrics

3. **Push to GitHub**
   - Commit your changes
   - Push to GitHub
   - Watch the GitHub Actions workflow run automatically

4. **Explore the reports**
   - Look at different metrics
   - Compare smoke vs load test results
   - Check threshold configurations

## 🎉 You're Ready!

You now have a fully functional performance testing suite:
- ✅ k6 load tests configured
- ?,
```

## 🐛 Troubleshooting
line ready
- ✅ Playwright integration set up

## 💡 Pro Tips

1. **Run smoke tests frequently** - They're quick (15s) and catch issues early
2. **Save your reports** - Compare performance over time
3. **Adjust thresholds** - Make them stricter as your app improves
4. **Use environment variables** - Test different environments easily

## 📖 More Information

- See `README.md` for comprehensive documentation
- See `PROJECT_SUMMARY.md` for what's been implemented
- Check `.github/workflows/performance-tests.yml` for CI/CD co   npm ruady to test?** Run `npm run test:smoke` now! 🚀
