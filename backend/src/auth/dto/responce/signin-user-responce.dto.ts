import { IsJWT, IsNotEmpty } from 'class-validator';

export class SigninUserResponceDto {
  @IsNotEmpty()
  @IsJWT()
  access_token: string;
}
