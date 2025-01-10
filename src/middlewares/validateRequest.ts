import { AnyZodObject } from 'zod';
import { catchAsync } from '../utilities/catchAsync';
import { NextFunction, Request, Response } from 'express';
export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({ body: req.body });
    next();
  });
};
