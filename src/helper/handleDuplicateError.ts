import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleDuplicateError = (err: any, res: Response) => {
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: err.message,
    statusCode: StatusCodes.CONFLICT,
    error: err,
  });
};
