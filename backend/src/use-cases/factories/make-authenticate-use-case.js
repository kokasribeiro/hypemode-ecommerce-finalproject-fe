import { SequelizeUsersRepository } from '../../lib/sequelize/sequelize-users-repository.js';
import { AuthenticateUseCase } from '../authenticate-use-case.js';

export function makeAuthenticateUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

