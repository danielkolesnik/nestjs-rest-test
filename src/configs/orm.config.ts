// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const baseDir = join(__dirname, '..');

const config: ConnectionOptions = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.DATABASE_LOGGING,
  entities: [join(baseDir, '/**/*.model.{ts,js}')],
  synchronize: false,
  migrationsRun: true,
  migrations: [join(baseDir, 'db/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

console.log(config);

export default config;
