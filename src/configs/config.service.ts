import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor() {
    const filePath = `env/${process.env.NODE_ENV || 'development'}.env`;
    const config = dotenv.parse(fs.readFileSync(filePath));
    // TODO apply efficient config validation
    // this.envConfig = ConfigService.validateConfig(config);
    this.envConfig = config;
    console.log(process.env.NODE_ENV, this.envConfig);
  }

  /*
	  Ensures all needed variables are set, and returns the validated JavaScript object
	  including the applied default values.
  */
  private static validateConfig(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', '*.local')
        .default(''),
      API_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export interface IEnvConfig {
  [key: string]: string;
}
