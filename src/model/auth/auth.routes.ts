import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import userValidationSchema from '../user/user.validation';
import { AuthValidation } from './auth.validation';
const authRoutes = express.Router();

authRoutes.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.auth_c_login,
);
authRoutes.post(
  '/register',
  validateRequest(userValidationSchema),
  authController.auth_c_register,
);
export default authRoutes;
