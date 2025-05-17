import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurrencyEnum } from './enums/currency.enum';
import { CurrencySymbolEnum } from './enums/currency.symbol.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({
    nullable: true,
    enum: CurrencyEnum,
    default: CurrencyEnum.USD,
  })
  currency: CurrencyEnum;

  @Column({
    nullable: true,
    enum: CurrencySymbolEnum,
    default: CurrencySymbolEnum.USD,
  })
  currencySymbol: CurrencySymbolEnum;

  @Column({ nullable: false })
  vendorId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;
}
