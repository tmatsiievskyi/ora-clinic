import { execSync } from "child_process";
import fs from "fs";

console.log("Checking npm configuration...");

const npmrcContent = fs.readFileSync(".npmrc", "utf8");
console.log("Current .npmrc content:");
console.log(npmrcContent);

console.log("\nNPM Config:");
const npmConfig = execSync("npm config list").toString();
console.log(npmConfig);

const githubToken = process.env.GITHUB_TOKEN;
console.log("\nGitHub Token:", githubToken ? "Set" : "Not set");

// Try to view package info
try {
  const packageInfo = execSync("npm view @tmatsiievskyi/react_ui", {
    stdio: "pipe",
  }).toString();
  console.log("\nPackage info:");
  console.log(packageInfo);
} catch (error) {
  console.error("\nError viewing package info:", error.message);
}

console.log("\nNPM Configuration check complete.");
