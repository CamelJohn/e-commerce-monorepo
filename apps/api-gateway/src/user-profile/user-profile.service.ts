import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateUserProfileDto,
  IUpdateUserProfileDto,
} from './user-profile.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repo: Repository<UserProfile>,
  ) {}

  async create(dto: ICreateUserProfileDto) {
    const userProfile = this.repo.create(dto);
    return this.repo.save(userProfile);
  }

  async list() {
    return this.repo.findAndCount();
  }

  async get(userId: string) {
    const userProfile = await this.repo.findOneBy({ id: userId });

    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }
    return userProfile;
  }

  async update(userId: string, dto: IUpdateUserProfileDto) {
    await this.repo.update(userId, dto);
  }

  async delete(userId: string) {
    return this.repo.delete(userId);
  }
}
