import { SequelizeProductsRepository } from '../../repositories/sequelize/sequelize-products-repository.js';
import { GetProductUseCase } from '../get-product-use-case.js';

/**
 * Factory function to create GetProductUseCase with dependencies
 * Following Dependency Injection pattern
 */
export function makeGetProductUseCase() {
  const productsRepository = new SequelizeProductsRepository();
  const getProductUseCase = new GetProductUseCase(productsRepository);

  return getProductUseCase;
}

