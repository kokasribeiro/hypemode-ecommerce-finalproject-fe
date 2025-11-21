import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

export class GetProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(id) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError('Product');
    }

    return product;
  }
}

