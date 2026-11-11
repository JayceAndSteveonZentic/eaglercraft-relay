#!/usr/bin/env node
/**
 * Eaglercraft relay host preflight.
 *
 * This is deliberately NOT a relay server. It checks whether a separate host
 * is prepared to run a trusted, U3-compatible relay implementation.
 */
import os from "node:os";

const env = process.env;
const checks = [];

function check(name, ok, detail, severity = "error") {
  checks.push({ name, ok, detail, severity });
}

const nodeMajor = Number(process.versions.node.split(".")[0]);
check("Node.js version", nodeMajor >= 20, `Found ${process.versions.node}; Node 20+ is recommended for the host tooling.`);

const wss = env.PUBLIC_WSS_URL ?? "";
check(
  "Public secure WebSocket URL",
  /^wss:\/\//i.test(wss),
  wss ? `Configured: ${wss}` : "Set PUBLIC_WSS_URL to the public wss:// address friends would connect to."
);

const origins = (env.RELAY_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);
check(
  "Allowed browser origins",
  origins.length > 0 && !origins.includes("*"),
  origins.length ? `Configured ${origins.length} origin(s); wildcard is not accepted by this check.` : "Set RELAY_ALLOWED_ORIGINS to the exact origin that serves your Eaglercraft client."
);

const secret = env.RELAY_SECRET ?? "";
check(
  "Host-side secret configured",
  secret.length >= 32,
  secret ? "A 32+ character secret is present." : "No secret found. This only helps if the chosen relay software explicitly implements secret-based authentication.",
  "warning"
);

check(
  "No game world files in this tool",
  true,
  "This preflight tool does not read, change, or upload browser saves."
);

console.log("\nEaglercraft relay host preflight");
console.log(`Host: ${os.hostname()} | Platform: ${os.platform()} ${os.arch()}`);
console.log(`Node: ${process.versions.node}\n`);

for (const item of checks) {
  const tag = item.ok ? "PASS" : item.severity === "warning" ? "WARN" : "FAIL";
  console.log(`[${tag}] ${item.name}: ${item.detail}`);
}

const failures = checks.filter((x) => !x.ok && x.severity === "error").length;
const warnings = checks.filter((x) => !x.ok && x.severity === "warning").length;
console.log(`\nResult: ${failures} blocking issue(s), ${warnings} warning(s).`);

if (failures) process.exitCode = 1;
