import { IsInt, IsString, IsArray, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

// Enum untuk metode pembayaran
enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
}

// DTO untuk `orderItem`
class CreateOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  total_price: number;
}

// DTO untuk `orders`
export class CreateOrderDto {
  @IsInt()
  kasirId: number;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsInt()
  total_price: number;

  @IsInt()
  total_item: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
