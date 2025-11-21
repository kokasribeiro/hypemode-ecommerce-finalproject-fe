import { formatResponse } from '../utils/hateoas.js';
import { makeGetProductsUseCase } from '../use-cases/factories/make-get-products-use-case.js';
import { makeGetProductUseCase } from '../use-cases/factories/make-get-product-use-case.js';
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      discount,
      featured,
      newArrival,
      bestSeller,
      page = 1,
      limit = 20,
      sort = '-createdAt',
    } = req.query;

    // Parse sort parameter
    let sortField = 'createdAt';
    let sortOrder = 'DESC';
    if (sort.startsWith('-')) {
      sortField = sort.substring(1);
      sortOrder = 'DESC';
    } else {
      sortField = sort;
      sortOrder = 'ASC';
    }

    // Use GetProductsUseCase following Clean Architecture
    const getProductsUseCase = makeGetProductsUseCase();
    const { products, pagination } = await getProductsUseCase.execute({
      category,
      search,
      minPrice,
      maxPrice,
      discount: discount === 'true' ? true : undefined,
      featured: featured === 'true' ? true : undefined,
      newArrival: newArrival === 'true' ? true : undefined,
      bestSeller: bestSeller === 'true' ? true : undefined,
      page,
      limit,
      sort: sortField,
      order: sortOrder,
    });

    const response = formatResponse(req, products, 'products', {
      page: pagination.page,
      totalPages: pagination.pages,
      limit: pagination.limit,
    });

    return res.status(200).json({
      success: true,
      count: pagination.total,
      totalPages: pagination.pages,
      currentPage: pagination.page,
      ...response,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    // Use GetProductUseCase following Clean Architecture
    const getProductUseCase = makeGetProductUseCase();
    const product = await getProductUseCase.execute(req.params.id);

    const response = formatResponse(req, product, 'products', {
      id: product.id,
      additionalActions: {
        addToCart: {
          path: 'cart',
          method: 'POST',
          title: 'Add to cart',
        },
      },
    });

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

// @desc    Create product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const getProductsUseCase = makeGetProductsUseCase();
    const product = await getProductsUseCase.productsRepository.create(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const getProductsUseCase = makeGetProductsUseCase();
    const product = await getProductsUseCase.productsRepository.update(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const getProductsUseCase = makeGetProductsUseCase();
    const product = await getProductsUseCase.productsRepository.delete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
