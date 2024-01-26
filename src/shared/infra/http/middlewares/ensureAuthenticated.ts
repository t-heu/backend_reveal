import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as authConfig from '../../../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing'); // 401
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.ACCESS_TOKEN_SECRET);

    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (err: any) {
    // console.log(err);
    throw new Error(err.messagew || 'Invalid JWT token'); // 401
  }
}
