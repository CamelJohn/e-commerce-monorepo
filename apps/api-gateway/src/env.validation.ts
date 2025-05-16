import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  SERVER_HTTP_PORT: number;

  @IsString()
  POSTGRES_HOST: string;

  @IsNumber()
  POSTGRES_PORT: number;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  COGNITO_ENDPOINT: string;

  @IsString()
  COGNITO_USER_POOL_ID: string;

  @IsString()
  COGNITO_CLIENT_ID: string;

  @IsString()
  COGNITO_REGION: string;
}

export class EnvironmentValidationError extends Error {
  constructor(messages: ValidationError[]) {
    super(messages?.join(''));
  }
}

export function validate(env: Record<string, unknown>) {
  const config = plainToInstance(EnvironmentVariables, env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(config, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new EnvironmentValidationError(errors);
  }
  return config;
}
