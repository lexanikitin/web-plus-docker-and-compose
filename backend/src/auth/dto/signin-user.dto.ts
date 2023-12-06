import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class SigninUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
