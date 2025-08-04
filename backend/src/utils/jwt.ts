import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  
  return jwt.sign({ id }, secret as any, {
    expiresIn: expiresIn as any
  });
};

export const verifyToken = (token: string): any => {
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    return jwt.verify(token, secret as any);
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 