import { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    details?: any;
    constructor(message: string, statusCode: number, details?: any);
}
export declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map