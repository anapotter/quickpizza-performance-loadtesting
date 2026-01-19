import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.3/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";

export const options = {
  scenarios: {
    ramping_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "20s", target: 5 },
        { duration: "40s", target: 15 },
        { duration: "20s", target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(90)<800", "p(95)<1200"],
  },
};

const BASE_URL = __ENV.BASE_URL || "https://quickpizza.grafana.com";

export default function () {
  // Baseline health
  const home = http.get(`${BASE_URL}/`);
  check(home, { "home is 200": (r) => r.status === 200 });

  // Add a second request to vary traffic (lightweight + stable)
  const icon = http.get(`${BASE_URL}/favicon.ico`);
  check(icon, { "favicon ok": (r) => r.status === 200 || r.status === 304 });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/load-report.html": htmlReport(data, { title: "QuickPizza Load Test Report" }),
    "reports/load-summary.json": JSON.stringify(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
