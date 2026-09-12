import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoots = ["app", "components", "data", "lib"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md"]);
const forbidden = [
  { label: "German mistranslation of MR Bows", pattern: /Herr\s+Bows/iu },
  { label: "Spanish mistranslation of Jan Franko", pattern: /Ene\s+Franco/iu },
  { label: "Russian month substituted for Jan", pattern: /Январь/u },
  { label: "deprecated contact email", pattern: /info@janfranko\.com/iu },
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolute));
    else if (extensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

const files = (await Promise.all(sourceRoots.map((root) => listFiles(path.join(projectRoot, root))))).flat();
const failures = [];

for (const file of files) {
  const contents = await readFile(file, "utf8");
  for (const rule of forbidden) {
    if (rule.pattern.test(contents)) failures.push(`${path.relative(projectRoot, file)}: ${rule.label}`);
  }
}

const siteData = await readFile(path.join(projectRoot, "data/site.ts"), "utf8");
const requiredProtectedTerms = [
  "Jan",
  "Jan Franko",
  "Warrick Harvey",
  "MR Bows",
  "Miško Rovčanin",
  "Kadys Bows",
  "Sergey Tolochko",
];

for (const term of requiredProtectedTerms) {
  if (!siteData.includes(`\"${term}\"`)) failures.push(`data/site.ts: missing protected term ${term}`);
}

const languageEntries = [...siteData.matchAll(/\{ code: \"[^\"]+\", label:/g)].length;
if (languageEntries !== 34) failures.push(`data/site.ts: expected 34 languages, found ${languageEntries}`);

if (failures.length) {
  console.error("Content verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Content verification passed across ${files.length} source files; protected names and 34-language registry are present.`);

