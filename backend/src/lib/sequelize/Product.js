import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    discountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Available sizes: ["S", "M", "L", "XL", "XXL"]',
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Available colors',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Additional product images',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    reviewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    newArrival: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'products',
  },
);

export default Product;

