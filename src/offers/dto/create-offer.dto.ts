import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  itemId: number;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  hidden: boolean;
}
