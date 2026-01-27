import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, '../src/openapi/models');
const indexPath = path.join(modelsDir, 'index.ts');

// Get all .ts files in models folder except index.ts
const files = fs.readdirSync(modelsDir)
  .filter((file: string) => file.endsWith('.ts') && file !== 'index.ts')
  .map((file: string) => file.replace('.ts', ''))
  .sort();

// Generate export statements
const exportStatements = files.map((file: string) => `export * from './${file}';`).join('\n');

const content = `/* tslint:disable */
/* eslint-disable */
// This file is auto-generated. Do not edit manually.
${exportStatements}
`;

fs.writeFileSync(indexPath, content);
console.log(`✅ Generated exports for ${files.length} models in index.ts`);
