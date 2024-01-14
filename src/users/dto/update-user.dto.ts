import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsUrl, Length, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(2, 30)
  @IsString()
  username: string;

  @Length(2, 200)
  @IsString()
  about: string;

  @IsUrl()
  @IsString()
  @MinLength(1)
  avatar: string;

  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
