import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';

// Define relationships

// User - Cart relationship
User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Product - Cart relationship
Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// User - Order relationship
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

export { User, Product, Cart, Order };

