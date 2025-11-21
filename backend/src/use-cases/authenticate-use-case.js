import generateToken from '../utils/generateToken.js';
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js';

export class AuthenticateUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password, rememberMe = false }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = generateToken(user.id, rememberMe);

    return {
      user: user.toSafeObject(),
      token,
    };
  }
}

