import { Repository, getRepository } from 'typeorm';

import Token from '@/shared/infra/database/typeorm/entity/Token';
import { ITokensRepository, ICreateDTO, ISave } from '@/modules/users/repos/ITokensRepo';

class TokensRepository implements ITokensRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = getRepository(Token);
  }

  public async create({ user_id, token, type }: ICreateDTO): Promise<void> {
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

  public async save(data: ISave): Promise<void> {
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
