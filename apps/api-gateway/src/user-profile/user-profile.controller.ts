import { Body, Controller, Param } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { IUpdateUserProfileDto } from './user-profile.interfaces';
import { CreateUserProfileDto } from './dto/user-profile.create.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  async create(@Body() dto: CreateUserProfileDto) {
    return this.userProfileService.create(dto);
  }

  async list() {
    return this.userProfileService.list();
  }

  async get(@Param(':userId') userId: string) {
    return this.userProfileService.get(userId);
  }

  async update(
    @Param(':userId') userId: string,
    @Body() dto: IUpdateUserProfileDto,
  ) {
    return this.userProfileService.update(userId, dto);
  }

  async delete(@Param(':userId') userId: string) {
    return this.userProfileService.delete(userId);
  }
}
