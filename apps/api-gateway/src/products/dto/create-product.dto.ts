import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { CurrencyEnum } from '../enums/currency.enum';
import { CurrencySymbolEnum } from '../enums/currency.symbol.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  price: number;

  @IsUUID()
  vendorId: string;

  @IsEnum(CurrencyEnum)
  @IsOptional()
  currency?: CurrencyEnum;

  @IsEnum(CurrencySymbolEnum)
  @IsOptional()
  currencySymbol?: CurrencySymbolEnum;
}
