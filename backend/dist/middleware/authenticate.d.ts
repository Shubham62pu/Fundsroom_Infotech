import { Request, Response, NextFunction } from 'express';
export interface AuthPayload {
    userId: string;
    role: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authenticate.d.ts.map