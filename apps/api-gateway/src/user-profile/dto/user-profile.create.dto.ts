import { IsEmail, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  cognitoUserId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
