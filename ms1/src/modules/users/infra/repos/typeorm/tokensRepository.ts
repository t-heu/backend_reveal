import { Repository } from 'typeorm';

import Token from '@/shared/infra/database/typeorm/entity/Token';
import { appDataSource } from '@/shared/infra/database';
import { ITokensRepository, CreateDTO, SaveDTO } from '@/modules/users/domain/repos/ITokensRepo';

class TokensRepository implements ITokensRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(Token);
  }

  public async create({ user_id, token, type }: CreateDTO): Promise<void> {
    const response = this.ormRepository.create({
      user_id,
      token,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.save(response);
  }

  public async findByToken(token: string): Promise<Token> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    if (!userToken) {
      throw new Error('token does not exists');
    }

    return userToken;
  }

  public async save(data: SaveDTO): Promise<void> {
    await this.ormRepository.update(data.id, data);
  }

  public async is_revogedAll(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('token')
      .update()
      .set({ is_revoked: 1 })
      .where(`user_id = :userID AND type = :refresh_token`, {
        userID: id,
        refresh_token: 'refresh_token',
      })
      .execute();
  }
}

export default TokensRepository;
