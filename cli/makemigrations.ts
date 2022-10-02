import { execSync } from 'child_process';

if (process.argv.length !== 3) {
  console.error('Unknown migration name\nUse: npm run migration:generate MigrationName');
  process.exit(1);
}
const migrationName = process.argv.slice(2)[0];
console.log(
  execSync(
    `typeorm-ts-node-commonjs migration:generate ./src/migrations/${migrationName} -d ./src/data-source.ts`,
  ).toString(),
);
