import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleZodError = (err: any, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err.message,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: err,
    stack: err.stack,
  });
};
