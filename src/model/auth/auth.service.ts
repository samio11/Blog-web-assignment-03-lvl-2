import User from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from '../user/user.interface';

const authLogin = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('Invalid User');
  }
  const isBlocked = user.isBlocked;
  if (isBlocked === true) {
    throw new Error('User is blocked');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new Error('Invalid Password');
  }
  const JwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(JwtPayload, 'secret', { expiresIn: '1d' });
  return { token };
};

const authRegister = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const authService = {
  authLogin,
  authRegister,
};
