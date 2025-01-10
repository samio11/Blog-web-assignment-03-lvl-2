import express, { Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Server is Running');
});

app.use(globalErrorHandler);
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Page not found',
    statusCode: StatusCodes.NOT_FOUND,
  });
});

export default app;
