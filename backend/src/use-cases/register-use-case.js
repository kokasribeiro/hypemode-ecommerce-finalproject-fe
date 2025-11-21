import generateToken from '../utils/generateToken.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

export class RegisterUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password, phone, address, city, postalCode, country }) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

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

    const token = generateToken(user.id);

    return {
      user: user.toSafeObject(),
      token,
    };
  }
}

