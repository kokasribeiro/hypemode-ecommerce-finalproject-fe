import { SequelizeUsersRepository } from '../../repositories/sequelize/sequelize-users-repository.js';
import { RegisterUseCase } from '../register-use-case.js';

/**
 * Factory function to create RegisterUseCase with dependencies
 * Following Dependency Injection pattern
 */
export function makeRegisterUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}

