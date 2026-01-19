# QuickPizza Performance / Load Testing Portfolio Project

[![Performance Tests](https://github.com/anapotter/quickpizza-performance-loadtesting/actions/workflows/performance-tests.yml/badge.svg)](https://github.com/anapotter/quickpizza-performance-loadtesting/actions/workflows/performance-tests.yml)

This repository demonstrates performance and load testing best practices for web applications, targeting the QuickPizza demo application at https://quickpizza.grafana.com/

## 🎯 Project Features

- **Load Testing with k6** - Smoke and load test scenarios
- **Performance Metrics & Thresholds** - Error rates and latency percentiles
- **HTML & JSON Reporting** - Beautiful, shareable test reports
- **Playwright Tracing** - Performance debugging artifacts
- **CI/CD Integration** - Automated GitHub Actions workflows

---

## 📋 Prerequisites

- **Node.js** v18+ 
- **k6** (installed via Homebrew or other package manager)
- **Playwright** (installed via npm)
- **VS Code** (recommended)

-## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/anapotter/quickpizza-performance-loadtesting.git
cd quickpizza-performance-loadtesting
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install chromium
```

### 4. Run tests

```bash
# Run smoke test
npm run test:smoke

# Run load test
npm run test:load

# Run Playwright tests
npm run test:playwright

# Run all tests
npm test
```

---

## 📊 Test Scenarios

### Smoke Test (`tests/smoke.js`)

- **Duration:** 15 seconds
- **Virtual Users:** 1
- **Thresholds:**
  - Error rate < 1%
  - p95 latency < 800ms
- **Purpose:** Quick health check to verify the system is functional

### Load Test (`tests/load.js`)

- **Duration:** 80 seconds (ramping)
- **Virtual Users:** 0 → 5 → 15 → 0
- **Stages:**
  - Ramp up to 5 VUs over 20s
  - Sustain 15 VUs for 40s
  - Ramp down to 0 over 20s
- **Thresholds:**
  - Error rate < 1%
  - p90 latency < 800ms
  - p95 latens
- **Purpose:** Test system behavior under sustained load

---

## 📈 Reports

After running tests, reports are generated in the `reports/` directory:

- **HTML Reports:** Visual, interactive reports with charts
  - `smoke-report.html` - Smoke test results
  - `load-report.html` - Load test results
  
- **JSON Summaries:** Machine-readable test data
  - `smoke-summary.json` - Smoke test metrics
  - `load-summary.json` - Load test metrics

- **Playwright Traces:** Performance debugging artifacts
  - `trace-homepage.zip` - Browser interaction trace

### Viewing Playwright Traces

```bash
npx playwright show-trace reports/trace-homepage- **Purpose:** Quick hHub Actions CI/CD

The project includes automated workflows that run:

- **On Push/PR:** To main/master branches
- **Scheduled:** Daily at 2 AM UTC
- **Manual:** Via workflow_dispatch

### Workflow Structure

1. **Smoke Test Job** - Quick validation
2. **Load Test Job** - Runs after smoke test passes
3. **Publish Results** - Uploads all artifacts for download

### Artifacts

Test results are uploaded as GitHub Actions artifacts and retained for 30 days:
- `smoke-test-results` - Smoke test reports
- `load-test-results` - Load test reports  
- `all-test-results` - Combined results

---

## 🛠️ Project Structure

```
quickpizza-performance-loadtesting/
├── .github/
│   └── workflows/
│       └── performance-tests.yml    # CI/CD workflow
├── tests/
│   ├── smoke.js                     # Smoke test scenario
│   ├── load.js                      # Load test scenario
│   └── quickpizza.spec.js           # Playwright tests
├── reports/                                 # Utility scripts
├── package.json                     # Node dependencies
├── playwright.config.js             # Playwright configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🎨 Customization

### Change Target URL

Set the `BASE_URL` environment variable:

```bash
BASE_URL=https://your-app.com npm run test:smoke
```

### Adjust Thresholds

Edit the `options.thresholds` in test files:

```javascript
thresholds: {
  http_req_failed: ["rate<0.05"],      // Allow 5% errors
  http_req_duration: ["p(95)<1000"],   // 95th percentile under 1s
}
```

### Modify Load Pattern

Change the `stages` in `tests/load.js`:

```javascript
stages: [
  { duration: "30s", target: 10 },
  { duration: "60s", target: 50 },
  { duration: "30s", target: 0 },
]
```

---

## 📚 Resources

- [k6 Documentation](https:├── reports/                                 # Utility shttps://github.com/benc-uk/k6-reporter)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

ISC

---

## 👤 Author

Anna Stewart
- GitHub: [@anapotter](https://github.com/anapotter)

---

## 🙏 Acknowledgments

- [Grafana Labs](https://grafana.com/) for the QuickPizza demo app and k6
- [Ben Coleman](https://github.com/benc-uk) for the k6 HTML reporter
- [Microsoft](https://github.com/microsoft) for Playwright
