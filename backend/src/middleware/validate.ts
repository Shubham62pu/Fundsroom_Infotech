import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // Zod v4 uses .issues (renamed from .errors in v3)
      if (error instanceof ZodError || (error as any)?.name === 'ZodError') {
        const zodError = error as any;
        return res.status(400).json({
          error: 'Validation failed',
          details: zodError.issues ?? zodError.errors ?? [],
        });
      }
      return next(error);
    }
  };
};
