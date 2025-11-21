import { SequelizeUsersRepository } from '../../repositories/sequelize/sequelize-users-repository.js';
import { AuthenticateUseCase } from '../authenticate-use-case.js';

/**
 * Factory function to create AuthenticateUseCase with dependencies
 * Following Dependency Injection pattern
 */
export function makeAuthenticateUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

