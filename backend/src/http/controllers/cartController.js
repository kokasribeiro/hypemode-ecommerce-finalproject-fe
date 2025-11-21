import { Cart, Product } from '../../lib/sequelize/index.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'stock', 'discount', 'discountPercentage'],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Check if item already in cart
    const existingCartItem = await Cart.findOne({
      where: {
        userId: req.user.id,
        productId,
        size: size || null,
        color: color || null,
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      cartItem = existingCartItem;
    } else {
      // Create new cart item
      cartItem = await Cart.create({
        userId: req.user.id,
        productId,
        quantity,
        size,
        color,
      });
    }

    // Get cart item with product details
    const cartItemWithProduct = await Cart.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'stock', 'discount', 'discountPercentage'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: cartItemWithProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    // Check stock
    const product = await Product.findByPk(cartItem.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const updatedCartItem = await Cart.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'stock', 'discount', 'discountPercentage'],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: updatedCartItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    await cartItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    await Cart.destroy({
      where: { userId: req.user.id },
    });

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    next(error);
  }
};

