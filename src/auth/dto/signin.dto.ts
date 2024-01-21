import { IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}
