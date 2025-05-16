import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoService } from './auth/cognito.service';
import { validate } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './env.constatns';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, envFilePath: '.env.dev' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(POSTGRES_HOST),
        port: configService.get<number>(POSTGRES_PORT),
        username: configService.get<string>(POSTGRES_USER),
        password: configService.get<string>(POSTGRES_PASSWORD),
        database: configService.get<string>(POSTGRES_DB),
      }),
    }),
    UserProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, CognitoService],
  exports: [],
})
export class AppModule {}
