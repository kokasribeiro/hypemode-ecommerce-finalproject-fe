import jwt from 'jsonwebtoken';

const generateToken = (userId, rememberMe = false) => {
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';

  if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'test') {
    console.warn('⚠️  JWT_SECRET not set. Using fallback development secret.');
  }

  const expiresIn = rememberMe ? '30d' : process.env.JWT_EXPIRE || '7d';

  return jwt.sign({ id: userId }, jwtSecret, { expiresIn });
};

export default generateToken;
