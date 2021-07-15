import * as dotenv from 'dotenv';
import { dotEnvOptions } from './dotenv-options';

// Make sure db config is imported after dotenv config
dotenv.config(dotEnvOptions);
import * as dbConfig from './orm.config';

export default dbConfig.default;
