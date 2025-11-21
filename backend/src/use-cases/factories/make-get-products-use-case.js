import { SequelizeProductsRepository } from '../../lib/sequelize/sequelize-products-repository.js';
import { GetProductsUseCase } from '../get-products-use-case.js';

export function makeGetProductsUseCase() {
  const productsRepository = new SequelizeProductsRepository();
  const getProductsUseCase = new GetProductsUseCase(productsRepository);

  return getProductsUseCase;
}

