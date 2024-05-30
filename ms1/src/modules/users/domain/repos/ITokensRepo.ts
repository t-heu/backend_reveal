export interface UserTokenDTO {
  id: string;
  token: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  is_revoked: number;
}

export interface SaveDTO {
  is_revoked: number;
  id: string;
}

export interface CreateDTO {
  token: string;
  type: string;
  createdAt?: Date;
  user_id: string;
}

export interface ITokensRepository {
  findByToken(token: string): Promise<UserTokenDTO>;
  create(data: CreateDTO): Promise<void>;
  save(data: SaveDTO): Promise<void>;
  is_revogedAll(id: string): Promise<void>;
}
