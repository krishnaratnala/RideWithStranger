import jwt, { SignOptions, JwtPayload as JwtLibPayload } from 'jsonwebtoken';

/**
 * App JWT Payload
 */
export interface JwtPayload {
  userId: string;
  role: 'RIDER' | 'PARTNER';
  email?: string;
}

/**
 * Ensure JWT_SECRET exists
 */
const JWT_SECRET: jwt.Secret = (() => {
  if (!process.env.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
  }
  return process.env.JWT_SECRET;
})();

/**
 * Generate JWT token
 */
export const generateToken = (
  payload: JwtPayload,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string => {
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtLibPayload;

  return {
    userId: decoded.userId as string,
    role: decoded.role as 'RIDER' | 'PARTNER',
    email: decoded.email as string | undefined,
  };
};
