import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
  AuthFlowType,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  COGNITO_CLIENT_ID,
  COGNITO_ENDPOINT,
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
} from '../env.constatns';
import { ICognitoLoginDto, ICognitoRegisterDto } from './auth.interfaces';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class CognitoService {
  private client: CognitoIdentityProviderClient;
  private userPoolId: string | undefined;
  private clientId: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.initCognitoClient();
    this.initUserPool();
    this.initCognitoClientId();
  }

  private initCognitoClient() {
    this.client = new CognitoIdentityProviderClient({
      region: this.configService.get<string>(COGNITO_REGION) || '',
      endpoint: this.configService.get<string>(COGNITO_ENDPOINT) || '',
      credentials: {
        accessKeyId: this.configService.get<string>(AWS_ACCESS_KEY_ID) || '',
        secretAccessKey:
          this.configService.get<string>(AWS_SECRET_ACCESS_KEY) || '',
      },
    });
  }

  private initUserPool() {
    this.userPoolId = this.configService.get<string>(COGNITO_USER_POOL_ID);
  }

  private initCognitoClientId() {
    this.clientId = this.configService.get<string>(COGNITO_CLIENT_ID);
  }

  async login(dto: ICognitoLoginDto) {
    const command = new AdminInitiateAuthCommand({
      AuthFlow: AuthFlowType.ADMIN_NO_SRP_AUTH,
      ClientId: this.clientId,
      UserPoolId: this.userPoolId,
      AuthParameters: {
        USERNAME: dto.username,
        PASSWORD: dto.password,
      },
    });

    return this.client.send(command);
  }

  async register(dto: ICognitoRegisterDto) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: dto.username,
      Password: dto.password,
    });

    const signUpCommandResult = await this.client.send(command);

    await this.userProfileService.create({
      cognitoUserId: signUpCommandResult.UserSub || '',
      name: dto.username,
      email: dto.email,
    });

    return signUpCommandResult;
  }
}
