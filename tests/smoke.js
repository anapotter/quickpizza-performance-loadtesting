import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.3/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";

export const options = {
  vus: 1,
  duration: "15s",
  thresholds: {
    http_req_failed: ["rate<0.01"],     // <1% errors
    http_req_duration: ["p(95)<800"],   // 95% under 800ms (tune if needed)
  },
};

const BASE_URL = __ENV.BASE_URL || "https://quickpizza.grafana.com";

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { "GET / returns 200": (r) => r.status === 200 });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/smoke-report.html": htmlReport(data, { title: "QuickPizza Smoke Test Report" }),
    "reports/smoke-summary.json": JSON.stringify(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
