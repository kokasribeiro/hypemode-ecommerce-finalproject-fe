import generateToken from '../utils/generateToken.js';
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js';

/**
 * Authenticate Use Case
 * Handles user authentication business logic
 * Following Single Responsibility Principle
 */
export class AuthenticateUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password, rememberMe = false }) {
    // Find user by email
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Verify password using User model method
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    // Generate JWT token (30 days if rememberMe, otherwise 7 days)
    const token = generateToken(user.id, rememberMe);

    return {
      user: user.toSafeObject(),
      token,
    };
  }
}

