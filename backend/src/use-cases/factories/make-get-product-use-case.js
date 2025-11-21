import { SequelizeProductsRepository } from '../../repositories/sequelize/sequelize-products-repository.js';
import { GetProductUseCase } from '../get-product-use-case.js';

export function makeGetProductUseCase() {
  const productsRepository = new SequelizeProductsRepository();
  const getProductUseCase = new GetProductUseCase(productsRepository);

  return getProductUseCase;
}

