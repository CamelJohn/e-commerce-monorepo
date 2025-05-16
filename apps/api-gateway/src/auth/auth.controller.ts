import { Body, Controller, Post } from '@nestjs/common';
import { CognitoService } from './cognito.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly cognitoService: CognitoService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.cognitoService.login(body);
  }

  @Post('register')
  async register(
    @Body() body: { username: string; password: string; email: string },
  ) {
    return this.cognitoService.register(body);
  }
}
