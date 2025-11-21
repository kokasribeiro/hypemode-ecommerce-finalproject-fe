import { User } from '../../models/index.js';
import { UsersRepository } from '../users-repository.js';

/**
 * Sequelize implementation of UsersRepository
 * Handles all database operations for users using Sequelize ORM
 */
export class SequelizeUsersRepository extends UsersRepository {
  async findById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update(data);
    return user;
  }
}

