import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list() {
    const [products, total] = await this.productRepository.findAndCount();

    return {
      products,
      total,
    };
  }

  getOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  createOne(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  createMany(dto: CreateProductDto[]) {
    const products = this.productRepository.create(dto);
    return this.productRepository.save(products);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productRepository.update({ id }, dto);

    if (product.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.getOne(id);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
