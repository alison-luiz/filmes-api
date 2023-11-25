import { AppError } from '@/shared/utils/appError.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.userRepository.save(
        this.userRepository.create(data),
      );

      return createdUser;
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATE_USER',
        message: 'Error creating user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_USER',
        message: 'Error finding user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_USER',
        message: 'Error finding user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      const updateUser = this.userRepository.merge(user, updateUserDto);

      return await this.userRepository.save(updateUser);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_USER',
        message: 'Error updating user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}
