import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(64)
  @MinLength(1)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  about?: string;

  @IsUrl(
    {
      protocols: ['http', 'https'],
    },
    { message: 'Невалидная ссылка на аватар пользователя' },
  )
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
