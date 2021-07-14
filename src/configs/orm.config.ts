import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dkolesnik',
  password: 'Hgnd_hdnsj928',
  database: 'nestjs_rest_test',
  logging: 'all',
  entities: [join(__dirname, '/../**/*.model.{ts,js}')],
  synchronize: false,
  migrationsRun: true,
  migrations: [join(__dirname, '..', 'db/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

// this config is used in 2 cases (app run and migration performing)
// and paths of directories are different for 2 cases...
function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration' ? __dirname : join(__dirname, '..');
  const migrationDirectory = join(directory, 'db/migrations/**/*{.ts,.js}');

  console.log(
    `\n~~~~~~~~~\n~~~~~~~~~~\n${__dirname}\n${migrationDirectory}\n~~~~~~~\n~~~~~~~~\n`,
  );

  return migrationDirectory;
}

export default config;
