import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignupUserResponceDto } from './dto/responce/signup-user-responce.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signin')
  async signin(@Request() { user }) {
    return this.authService.signin(user);
  }

  @Public()
  @Post('signup')
  async signup(
    @Body() signupUserDto: CreateUserDto,
  ): Promise<SignupUserResponceDto> {
    return this.authService.signup(signupUserDto);
  }
}
