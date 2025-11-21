export class GetProductsUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(filters = {}) {
    const result = await this.productsRepository.findAll(filters);
    return result;
  }
}

