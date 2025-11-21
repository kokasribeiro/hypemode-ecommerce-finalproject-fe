import generateToken from '../utils/generateToken.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

/**
 * Register Use Case
 * Handles user registration business logic
 * Following Single Responsibility Principle
 */
export class RegisterUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password, phone, address, city, postalCode, country }) {
    // Check if user already exists
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // Create user (password will be hashed by Sequelize hook)
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    // Generate JWT token
    const token = generateToken(user.id);

    return {
      user: user.toSafeObject(),
      token,
    };
  }
}

