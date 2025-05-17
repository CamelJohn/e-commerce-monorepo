import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CurrencyEnum } from '../enums/currency.enum';
import { CurrencySymbolEnum } from '../enums/currency.symbol.enum';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsEnum(CurrencyEnum)
  @IsOptional()
  currency?: CurrencyEnum;

  @IsEnum(CurrencySymbolEnum)
  @IsOptional()
  currencySymbol?: CurrencySymbolEnum;
}
