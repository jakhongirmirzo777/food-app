import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMealDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  categoryId: string;
}
