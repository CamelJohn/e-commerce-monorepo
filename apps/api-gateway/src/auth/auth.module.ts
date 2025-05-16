import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { CognitoService } from './cognito.service';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

@Module({
  imports: [UserProfileModule],
  controllers: [AuthController],
  providers: [ConfigService, CognitoService],
  exports: [CognitoService],
})
export class AuthModule {}
