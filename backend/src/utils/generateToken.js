import jwt from 'jsonwebtoken';

const generateToken = (userId, rememberMe = false) => {
  // If "Remember Me" is checked, token lasts 30 days, otherwise 7 days
  const expiresIn = rememberMe ? '30d' : process.env.JWT_EXPIRE || '7d';

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export default generateToken;
