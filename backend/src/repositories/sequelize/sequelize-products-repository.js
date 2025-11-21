import { Product } from '../../models/index.js';
import { ProductsRepository } from '../products-repository.js';
import { Op } from 'sequelize';

/**
 * Sequelize implementation of ProductsRepository
 * Handles all database operations for products using Sequelize ORM
 */
export class SequelizeProductsRepository extends ProductsRepository {
  async findById(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  async findAll(filters = {}) {
    const {
      category,
      minPrice,
      maxPrice,
      featured,
      newArrival,
      bestSeller,
      discount,
      search,
      sort = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 12,
    } = filters;

    const where = { active: true };

    // Apply filters
    if (category) {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (newArrival !== undefined) {
      where.newArrival = newArrival;
    }

    if (bestSeller !== undefined) {
      where.bestSeller = bestSeller;
    }

    if (discount !== undefined) {
      where.discount = discount;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Execute query
    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      products: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    };
  }

  async create(data) {
    const product = await Product.create(data);
    return product;
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) {
      return null;
    }

    await product.update(data);
    return product;
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      return null;
    }

    await product.destroy();
    return product;
  }
}

