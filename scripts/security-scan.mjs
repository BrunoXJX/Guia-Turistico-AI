import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const scanTargets = [
  ".github",
  "api",
  "public",
  "server",
  "src",
  ".env.example",
  "index.html",
  "package.json",
  "README.md",
  "SECURITY.md",
  "vite.config.ts",
];

const blockedPatterns = [
  {
    name: "OpenAI API key",
    pattern: /sk-(?:proj|live|test)?-[A-Za-z0-9_-]{24,}/g,
  },
  {
    name: "Wildcard CORS on proxy",
    pattern: /Access-Control-Allow-Origin["']?\s*[:=]\s*["']\*/g,
  },
  {
    name: "Browser-side OpenAI secret env",
    pattern: /VITE_OPENAI_API_KEY/g,
  },
];

const ignoredDirectories = new Set([
  ".codex",
  ".git",
  "dist",
  "node_modules",
]);

function listFiles(target) {
  const absoluteTarget = path.join(root, target);

  if (!fs.existsSync(absoluteTarget)) {
    return [];
  }

  const stat = fs.statSync(absoluteTarget);

  if (stat.isFile()) {
    return [absoluteTarget];
  }

  return fs.readdirSync(absoluteTarget, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      return [];
    }

    return listFiles(path.join(target, entry.name));
  });
}

const findings = [];

for (const file of scanTargets.flatMap(listFiles)) {
  const content = fs.readFileSync(file, "utf8");
  const relativePath = path.relative(root, file);

  for (const { name, pattern } of blockedPatterns) {
    pattern.lastIndex = 0;

    for (const match of content.matchAll(pattern)) {
      const line =
        content.slice(0, match.index).split(/\r?\n/).length;
      findings.push(`${relativePath}:${line} ${name}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Security scan failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Security scan passed.");
