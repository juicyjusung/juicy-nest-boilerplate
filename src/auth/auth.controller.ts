import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStatus } from './dto/login-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/entity/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  public async logout(@Req() req: any): Promise<any> {
    req.logout();
    return;
  }

  @Get('whoami')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<User> {
    return req.user;
  }
}
