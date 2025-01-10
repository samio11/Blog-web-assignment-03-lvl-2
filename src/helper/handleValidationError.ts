import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleValidationError = (err: any, res: Response) => {
  const stack = Object.values(err.errors).map((x: any) => {
    return {
      name: x.name,
      path: x.path,
    };
  });
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err.message,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: err,
    stack,
  });
};
