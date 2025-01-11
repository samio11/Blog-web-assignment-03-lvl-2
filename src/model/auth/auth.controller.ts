import { Request, Response } from 'express';
import { catchAsync } from '../../utilities/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utilities/sendResponse';
import { StatusCodes } from 'http-status-codes';

const auth_c_login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.authLogin(req.body);
  sendResponse(res, {
    success: true,
    message: 'login successful',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const auth_c_register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.authRegister(req.body);
  sendResponse(res, {
    success: true,
    message: 'Registration successful',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const authController = {
  auth_c_login,
  auth_c_register,
};
