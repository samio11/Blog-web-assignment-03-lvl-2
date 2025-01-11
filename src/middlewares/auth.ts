import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utilities/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/user/user.model';
import { TUserRole } from '../model/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new Error(`Invalid authorization`);
    }
    const decoded = jwt.verify(token, 'secret');
    const { email, role } = decoded as JwtPayload;
    //todo: fetch the user/check blocked check role then next
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User not found`);
    }
    if (user.isBlocked === true) {
      throw new Error(`User is blocked`);
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error(`User role does not have the required access`);
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
