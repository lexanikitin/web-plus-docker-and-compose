import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../create-user.dto';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserProfileResponceDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  updatedAt: Date;
}
