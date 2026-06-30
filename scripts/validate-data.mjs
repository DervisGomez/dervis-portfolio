import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const rootDir = process.cwd();
const dataPath = path.join(rootDir, "lib", "data.ts");
const publicDir = path.join(rootDir, "public");
const messagesDir = path.join(rootDir, "messages");

const errors = [];

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function loadDataModule() {
  const source = readFileSync(dataPath, "utf8");
  const result = ts.transpileModule(source, {
    fileName: dataPath,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });

  const diagnostics = result.diagnostics ?? [];
  for (const diagnostic of diagnostics) {
    if (diagnostic.category === ts.DiagnosticCategory.Error) {
      errors.push(`lib/data.ts: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`);
    }
  }

  const compiledModule = { exports: {} };
  const sandbox = {
    exports: compiledModule.exports,
    module: compiledModule,
    require,
  };

  vm.runInNewContext(result.outputText, sandbox, { filename: dataPath });

  return compiledModule.exports;
}

function getPathValue(value, keyPath) {
  return keyPath.reduce((current, key) => current?.[key], value);
}

function walk(value, visitor, keyPath = []) {
  visitor(value, keyPath);

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, childValue] of Object.entries(value)) {
    walk(childValue, visitor, [...keyPath, key]);
  }
}

function isImagePath(value) {
  return (
    typeof value === "string" &&
    value.startsWith("/") &&
    /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(value)
  );
}

function isImportantUrlPath(keyPath) {
  const normalizedPath = keyPath.join(".").toLowerCase();
  const leafKey = keyPath.at(-1)?.toLowerCase() ?? "";

  return (
    /(url|href|github|demo|store|swagger|healthcheck|linkedin|whatsapp)/i.test(leafKey) ||
    normalizedPath.includes("storeappurls") ||
    normalizedPath.includes("platformurls") ||
    normalizedPath.includes("externallinks")
  );
}

function isInvalidUrlValue(value) {
  const normalized = value.trim();
  return normalized === "" || normalized === "#" || /^todo\b/i.test(normalized);
}

function validateProjectTranslations(projectIds, messages, locale) {
  const translatedItems = getPathValue(messages, ["projects", "items"]);

  if (!translatedItems || typeof translatedItems !== "object") {
    errors.push(`messages/${locale}.json: falta el objeto projects.items.`);
    return 0;
  }

  let validTranslations = 0;

  for (const projectId of projectIds) {
    const translation = translatedItems[projectId];

    if (!translation || typeof translation !== "object") {
      errors.push(`messages/${locale}.json: falta traducción para el proyecto "${projectId}".`);
      continue;
    }

    validTranslations += 1;
  }

  return validTranslations;
}

function validateImageReferences(dataModule) {
  const imageReferences = new Map();

  walk(dataModule, (value, keyPath) => {
    if (!isImagePath(value)) {
      return;
    }

    imageReferences.set(value, keyPath.join("."));
  });

  for (const [imagePath, sourcePath] of imageReferences) {
    const filePath = path.join(publicDir, imagePath.slice(1));

    if (!existsSync(filePath)) {
      errors.push(`lib/data.ts:${sourcePath}: la imagen "${imagePath}" no existe en public/.`);
    }
  }

  return imageReferences.size;
}

function validateImportantUrls(dataModule) {
  let checkedUrls = 0;

  walk(dataModule, (value, keyPath) => {
    if (typeof value !== "string" || !isImportantUrlPath(keyPath)) {
      return;
    }

    checkedUrls += 1;

    if (isInvalidUrlValue(value)) {
      errors.push(`lib/data.ts:${keyPath.join(".")}: URL inválida o placeholder: "${value}".`);
    }
  });

  return checkedUrls;
}

function validateProjectDataShape(dataModule, projectIds) {
  const productMeta = dataModule.productMeta;

  if (!productMeta || typeof productMeta !== "object") {
    errors.push("lib/data.ts: falta el objeto productMeta.");
    return;
  }

  for (const projectId of projectIds) {
    if (!productMeta[projectId]) {
      errors.push(`lib/data.ts: falta productMeta para el proyecto "${projectId}".`);
    }
  }
}

function main() {
  const dataModule = loadDataModule();
  const esMessages = loadJson(path.join(messagesDir, "es.json"));
  const enMessages = loadJson(path.join(messagesDir, "en.json"));
  const projectIds = dataModule.featuredProductIds ?? [];

  if (!Array.isArray(projectIds) || projectIds.length === 0) {
    errors.push("lib/data.ts: featuredProductIds debe contener al menos un proyecto.");
  }

  validateProjectDataShape(dataModule, projectIds);

  const esTranslationCount = validateProjectTranslations(projectIds, esMessages, "es");
  const enTranslationCount = validateProjectTranslations(projectIds, enMessages, "en");
  const imageCount = validateImageReferences(dataModule);
  const urlCount = validateImportantUrls(dataModule);

  if (errors.length > 0) {
    console.error("Content integrity validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Content integrity validation passed:");
  console.log(`- ${projectIds.length} projects defined in lib/data.`);
  console.log(`- ${esTranslationCount} ES project translations found.`);
  console.log(`- ${enTranslationCount} EN project translations found.`);
  console.log(`- ${imageCount} local image references verified.`);
  console.log(`- ${urlCount} important URLs checked.`);
}

main();
