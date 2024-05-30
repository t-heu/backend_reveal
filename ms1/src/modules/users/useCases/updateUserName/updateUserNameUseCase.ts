import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { UpdateUserNameDTO } from '@/modules/users/useCases/updateUserName/updateUserNameDTO';
import { UserName } from '@/modules/users/domain/userName';

@injectable()
class UpdateUserNameUseCase implements IUseCase<UpdateUserNameDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: UpdateUserNameDTO): Promise<void> {
    const existUser = await this.userRepository.findById(data.id);

    if (data.name && existUser.name.value !== data.name) {
      const name = UserName.create({ name: data.name });

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
