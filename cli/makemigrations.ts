import { execSync } from 'child_process';

const migrationName = process.argv.slice(2);
console.log(
  execSync(
    `typeorm-ts-node-commonjs migration:generate ./src/migrations/${migrationName} -d ./src/data-source.ts`,
  ).toString(),
);
