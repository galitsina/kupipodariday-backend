import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 30)
  @IsString()
  username: string;

  @IsOptional()
  @Length(2, 200)
  @IsString()
  about: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  @MinLength(1)
  avatar: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password: string;
}
