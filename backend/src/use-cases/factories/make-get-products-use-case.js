import { SequelizeProductsRepository } from '../../repositories/sequelize/sequelize-products-repository.js';
import { GetProductsUseCase } from '../get-products-use-case.js';

/**
 * Factory function to create GetProductsUseCase with dependencies
 * Following Dependency Injection pattern
 */
export function makeGetProductsUseCase() {
  const productsRepository = new SequelizeProductsRepository();
  const getProductsUseCase = new GetProductsUseCase(productsRepository);

  return getProductsUseCase;
}

