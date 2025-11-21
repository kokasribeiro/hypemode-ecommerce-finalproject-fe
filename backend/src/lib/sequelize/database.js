import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Auto-detect database type: PostgreSQL for Render, MySQL for local
const isPostgres = process.env.DB_DIALECT === 'postgres' || process.env.DATABASE_URL?.includes('postgres');
const dialect = isPostgres ? 'postgres' : 'mysql';

console.log(`🔍 Using database dialect: ${dialect}`);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'hypemode_ecommerce',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || (isPostgres ? 5432 : 3306),
    dialect: dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Database synced successfully${force ? ' (force mode)' : ''}.`);
  } catch (error) {
    console.error('❌ Error syncing database:', error.message);
    throw error;
  }
};

export default sequelize;

