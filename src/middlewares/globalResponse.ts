import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error.interface';

export const globalResponse = (
  err: IError | Error | null,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const status =
      'cause' in err && typeof err.cause === 'number' ? err.cause : 500;
    return res.status(status).json({
      message: 'Something went wrong',
      error_msg: err.message || 'Something went wrong',
    });
  }
};
