import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { UpdateUserNameDTO } from './UpdateUserNameDTO';
import { UserName } from '../../domain/userName';

@injectable()
class UpdateUserNameUseCase implements IUseCase<UpdateUserNameDTO, string | void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: UpdateUserNameDTO): Promise<string | void> {
    const existUser = await this.userRepository.findById(data.id);

    if (typeof existUser === 'string') {
      return existUser;
    }

    if (data.name && existUser.name.value !== data.name) {
      const name = UserName.create({ name: data.name });

      if (typeof name === 'string') {
        return name;
      }

      await this.userRepository.save({
        id: data.id,
        data: {
          name: name.value,
        },
      });
    }
  }
}

export default UpdateUserNameUseCase;
