import { join } from 'path';

const env = process.env.NODE_ENV || 'development';
const env_path = join(process.cwd(), `env/${env}.env`);

console.log(`
    _   __          __       _
   / | / /__  _____/ /_     (_)____
  /  |/ / _ \\/ ___/ __/    / / ___/
 / /|  /  __(__  ) /_     / (__  )
/_/ |_/\\___/____/\\__/  __/ /____/
                      /___/
`);
console.log(`Loading environment from ${env_path}`);

const dotEnvOptions = {
  path: env_path,
};

export { dotEnvOptions };
