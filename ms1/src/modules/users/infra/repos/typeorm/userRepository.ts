import { Repository } from 'typeorm';

import { User } from '@/modules/users/domain/user';
import { UserEmail } from '@/modules/users/domain/userEmail';
import UserMap from '@/modules/users/mappers/userMap';
import UserTypeorm from '@/shared/infra/database/typeorm/entity/User';
import { appDataSource } from '@/shared/infra/database';
import { IUserRepository, EditDTO } from '@/modules/users/domain/repos/IUserRepo';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserTypeorm>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(UserTypeorm);
  }

  public async findById(id: string): Promise<User> {
    const response = await this.ormRepository.findOne({
      where: { id },
      relations: ['external_auths', 'tokens'],
    });

    if (!response) throw new Error('User not found');

    return UserMap.toDomain(response);
  }

  public async findUserByEmail(userEmail: UserEmail): Promise<User> {
    const response = await this.ormRepository.findOne({
      where: { email: userEmail.value },
      relations: ['external_auths', 'tokens'],
    });
    
    if (!response) throw new Error('User not found');

    return UserMap.toDomain(response);
  }

  public async exists(userEmail: UserEmail): Promise<boolean> {
    const response = await this.ormRepository.findOne({
      where: { email: userEmail.value },
    });

    return !!response;
  }

  public async create(data: User): Promise<void> {
    const response = await UserMap.toPersistence(data);
    const user = this.ormRepository.create(response);
    await this.ormRepository.save(user);
  }

  public async save(data: EditDTO): Promise<void> {
    await this.ormRepository.update(data.id, data.data);
  }
}

export default UserRepository;
