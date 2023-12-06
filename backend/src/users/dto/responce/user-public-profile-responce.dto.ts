import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../create-user.dto';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserPublicProfileResponceDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  avatar: string;

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
