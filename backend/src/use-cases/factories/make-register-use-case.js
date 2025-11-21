import { SequelizeUsersRepository } from '../../repositories/sequelize/sequelize-users-repository.js';
import { RegisterUseCase } from '../register-use-case.js';

export function makeRegisterUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}

