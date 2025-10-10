import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';
import { formatResponse } from '../utils/hateoas.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, city, postalCode, country } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    // Generate token
    const token = generateToken(user.id);

    const userData = {
      user: user.toSafeObject(),
      token,
    };

    const response = formatResponse(req, userData, 'auth', {
      additionalActions: {
        login: {
          path: 'login',
          method: 'POST',
          title: 'Login',
        },
        profile: {
          path: 'profile',
          method: 'GET',
          title: 'Get user profile',
        },
      },
    });

    res.status(201).json({
      success: true,
      ...response,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token (30 days if rememberMe, otherwise 7 days)
    const token = generateToken(user.id, rememberMe);

    const userData = {
      user: user.toSafeObject(),
      token,
    };

    const response = formatResponse(req, userData, 'auth', {
      additionalActions: {
        profile: {
          path: 'profile',
          method: 'GET',
          title: 'Get user profile',
        },
        logout: {
          path: 'logout',
          method: 'POST',
          title: 'Logout',
        },
      },
    });

    res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, address, city, postalCode, country } = req.body;

    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.postalCode = postalCode || user.postalCode;
    user.country = country || user.country;

    await user.save();

    res.status(200).json({
      success: true,
      data: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};
