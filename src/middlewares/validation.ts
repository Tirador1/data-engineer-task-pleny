import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const reqKeys = ['body', 'params', 'query', 'headers'];

export const valdationMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];
    reqKeys.forEach((key) => {
      const result = (schema as any)[key]?.validate((req as any)[key], {
        abortEarly: false,
      });
      if (result?.error) {
        errors.push(result.error.details[0].message);
      }
    });
    if (errors.length > 0) {
      return next(new Error(errors.join(',')));
    }
    next();
  };
};
