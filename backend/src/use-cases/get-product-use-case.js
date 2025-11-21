import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

/**
 * Get Product Use Case
 * Handles fetching a single product by ID
 * Following Single Responsibility Principle
 */
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

