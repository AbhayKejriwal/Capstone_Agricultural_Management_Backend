// Define reusable functions:
//   - generateToken: Accept user ID(email) and role, sign and return JWT
//   - verifyToken: Verify JWT and return decoded payload

import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}