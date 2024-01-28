import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @Length(1, 250)
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsOptional()
  itemsIds: number[];
}
