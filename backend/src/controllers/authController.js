import { User } from '../models/index.js';
import { formatResponse } from '../utils/hateoas.js';
import { makeRegisterUseCase } from '../use-cases/factories/make-register-use-case.js';
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case.js';
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error.js';
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  const { name, email, password, phone, address, city, postalCode, country } = req.body;

  try {
    // Use RegisterUseCase following Clean Architecture
    const registerUseCase = makeRegisterUseCase();
    const { user, token } = await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    const userData = { user, token };

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

    return res.status(201).json({
      success: true,
      ...response,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Use AuthenticateUseCase following Clean Architecture
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user, token } = await authenticateUseCase.execute({
      email,
      password,
      rememberMe,
    });

    const userData = { user, token };

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

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
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
