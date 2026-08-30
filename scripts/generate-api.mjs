import { execFileSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const apiBaseUrl =
  process.env.VITE_API_BASE_URL ?? 'https://d2adq3gogejls2.cloudfront.net';
const specUrl = `${apiBaseUrl.replace(/\/$/, '')}/v3/api-docs`;
const outputDir = path.resolve(projectRoot, 'src/shared/apis/generated');

console.log(`Generating API types from: ${specUrl}`);

execFileSync(
  'pnpm',
  [
    'exec',
    'swagger-typescript-api',
    'generate',
    '--path',
    specUrl,
    '--output',
    outputDir,
    '--name',
    'Api.ts',
    '--no-client',
    '--extract-request-body',
    '--extract-response-body',
    '--enum-style',
    'union',
    '--sort-types',
    '--clean-output',
  ],
  {
    cwd: projectRoot,
    stdio: 'inherit',
  }
);
