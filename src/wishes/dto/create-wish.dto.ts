import { IsNumber, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @Length(1, 250)
  @IsString()
  name: string;

  @IsUrl()
  @IsString()
  link: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  description: string;
}
