import { RefreshToken, JWTToken } from '@/modules/users/domain/jwt';

export interface RequestDTO {
  refresh_token: RefreshToken;
  grant_type: string;
}

export interface ResponseDTO {
  access_token: JWTToken;
  // refresh_token: RefreshToken;
  token_type: string;
  expires: number;
}
