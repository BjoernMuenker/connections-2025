import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const timestamp = new Date().toISOString();

const version = {
  version: commit,
  builtAt: timestamp,
};

writeFileSync('./public/version.json', JSON.stringify(version, null, 2));

console.log('Generated version.json:', version);
