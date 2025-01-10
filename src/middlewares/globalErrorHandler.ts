import { NextFunction, Request, Response } from 'express';
import { handleZodError } from '../helper/handleZodError';
import mongoose from 'mongoose';
import { handleCastError } from '../helper/handleCastError';
import { handleValidationError } from '../helper/handleValidationError';
import { handleDuplicateError } from '../helper/handleDuplicateError';
import { handleGenericError } from '../helper/handleGenericError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'zodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
