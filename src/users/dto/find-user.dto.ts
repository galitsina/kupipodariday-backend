import { IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  value: string;
}
