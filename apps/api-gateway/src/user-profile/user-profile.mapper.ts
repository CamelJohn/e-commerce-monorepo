import { UserProfile } from './user-profile.entity';
import { ICreateUserProfileDto } from './user-profile.interfaces';

export class UserProfileMapper {
  static toEntity(dto: ICreateUserProfileDto): UserProfile {
    const userProfile = new UserProfile();
    userProfile.name = dto.name;
    userProfile.cognitoUserId = dto.cognitoUserId;
    userProfile.email = dto.email;
    return userProfile;
  }
}
