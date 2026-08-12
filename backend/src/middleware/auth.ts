import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // SECURITY ASSUMPTION: JWT_SECRET is strong and not exposed.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: Role };
    
    // Attach user payload to request
    (req as any).user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // SECURITY ASSUMPTION: Role is checked from the validated JWT payload (req.user.role), NOT from client body/headers
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};
