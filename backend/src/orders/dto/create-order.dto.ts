import {
  IsArray,
  IsInt,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderPaymentType } from '@prisma/client';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  mealId: string;
  @IsInt()
  mealQuantity: number;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  orderItems: OrderItemDto[];

  @IsOptional()
  @IsString()
  userPhoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  tableNumber?: number;

  @IsOptional()
  @IsEnum(OrderPaymentType)
  paymentType?: OrderPaymentType;
}
