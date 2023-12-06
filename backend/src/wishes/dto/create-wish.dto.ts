import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  description: string;
}
