import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utilities/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new Error(`Invalid authorization`);
    }
    const decoded = jwt.verify(token, 'secret');
    const { email, role } = decoded as JwtPayload;
    //todo: fetch the user/check active/inactive check role then next
  });
};
