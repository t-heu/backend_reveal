import { sign } from 'jsonwebtoken';
import randtoken from 'rand-token';

import { Entity } from '@/shared/domain/entity';
import * as authConfig from '../../../config/auth';

export interface JWTClaims {
  userID?: string;
  isEmailVerified?: boolean;
  email?: string;
}

export type JWTToken = string;
export type RefreshToken = string;

export class Jwt extends Entity<any> {
  public static generateAccessToken(claims: JWTClaims): JWTToken {
    return sign({ sub: claims.userID }, authConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: authConfig.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  public static generateRefreshToken(): RefreshToken {
    return randtoken.uid(256);
  }
}
