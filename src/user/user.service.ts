import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/interfaces/payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    console.log('%c [JL] getAllUsers - users', 'font-size: 16px; color:  red;', users);
    return await this.userRepository.find();
  }

  async findOne(userOptions: { id?: string }) {
    return await this.userRepository.findOne(userOptions);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [{ email: email }],
    });
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByPayload({ email }: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ where: [{ email: user.email }] })) {
      throw new HttpException('이미 존재하는 이메일 입니다', HttpStatus.CONFLICT);
    }
    const createdUser = await this.userRepository.create(user);
    return await this.userRepository.save(createdUser);
  }
}
