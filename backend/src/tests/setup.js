import { beforeAll, afterAll, beforeEach } from 'vitest';
import { execSync } from 'node:child_process';
import sequelize from '../config/database.js';

// Setup database before all tests
beforeAll(async () => {
  try {
    // Sync database for tests
    await sequelize.sync({ force: true });
    console.log('✅ Test database synced successfully');
  } catch (error) {
    console.error('❌ Failed to sync test database:', error);
    throw error;
  }
});

// Clean up after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
});

// Clean up before each test
beforeEach(async () => {
  try {
    // Clear all tables before each test
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
});
