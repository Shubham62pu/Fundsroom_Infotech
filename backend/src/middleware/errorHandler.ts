import { Request, Response, NextFunction } from 'express';


export class AppError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      const target = (prismaError.meta?.target as string[]) || [];
      res.status(409).json({
        error: `Duplicate value for: ${target.join(', ')}`,
      });
      return;
    }
    if (prismaError.code === 'P2025') {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
  }

  res.status(500).json({ error: 'Internal server error' });
};
