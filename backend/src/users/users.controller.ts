import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileResponceDto } from './dto/responce/user-profile-responce.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { GetUser } from '../common/decorators/getUser.decorator';
import { User } from './entities/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@GetUser() user: User): Promise<UserProfileResponceDto> {
    return this.usersService.findById(user.id);
  }
  @Get('me/wishes')
  findMyWishes(@GetUser() user: User) {
    return this.usersService.findUserWishes(user.username);
  }

  @Patch('me')
  update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponceDto> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    console.log(username);
    return this.usersService.findByUsername(username);
  }

  @Post('/find')
  findUserInfo(@Body() { query }: FindUsersDto) {
    return this.usersService.findMany(query);
  }
}
