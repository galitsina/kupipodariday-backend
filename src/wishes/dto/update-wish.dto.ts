import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class UpdateWishDto {
  @IsOptional()
  @Length(1, 250)
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  link: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @IsString()
  description: string;
}
