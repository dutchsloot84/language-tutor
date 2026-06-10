import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const requiredBins = ["node_modules/.bin/next", "node_modules/.bin/tsc"];
const hasRequiredDeps = requiredBins.every((path) => existsSync(path));

if (hasRequiredDeps) {
  console.log("Worktree dependencies already installed.");
  process.exit(0);
}

console.log("Worktree dependencies are missing. Running npm install...");
const result = spawnSync("npm", ["install"], { stdio: "inherit" });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
