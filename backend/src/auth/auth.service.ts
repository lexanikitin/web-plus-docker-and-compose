import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninUserResponceDto } from './dto/responce/signin-user-responce.dto';
import { UserPublicProfileResponceDto } from '../users/dto/responce/user-public-profile-responce.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async localValidation(signinUserDto: SigninUserDto) {
    const user = await this.usersService.findByUsername(signinUserDto.username);
    if (!user) {
      throw new UnauthorizedException('Ошибка авторизации');
    }
    if (await compare(signinUserDto.password, user.password)) {
      return user;
    }
    return null;
  }

  async signup(signupUserDto: CreateUserDto) {
    return this.usersService.create(signupUserDto);
  }

  async signin(
    user: UserPublicProfileResponceDto,
  ): Promise<SigninUserResponceDto> {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }
}
