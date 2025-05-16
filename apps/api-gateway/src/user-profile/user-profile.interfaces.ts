export interface ICreateUserProfileDto {
  cognitoUserId: string;
  name: string;
  email: string;
}

export interface IUpdateUserProfileDto {
  name?: string;
}
