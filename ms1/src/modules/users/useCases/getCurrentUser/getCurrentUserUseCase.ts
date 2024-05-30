import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { GetCurrentUserDTO } from '@/modules/users/useCases/getCurrentUser/getCurrentUserDTO';
import { User } from '@/modules/users/domain/user';

@injectable()
class GetCurrentUserUseCase implements IUseCase<GetCurrentUserDTO, User> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: GetCurrentUserDTO): Promise<User> {
    if (!data.id) {
      throw new Error('Token not found');
    }

    const user = await this.userRepository.findById(data.id);

    return user;
  }
}

export default GetCurrentUserUseCase;
