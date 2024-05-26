import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { ChangePasswordDTO } from './changePasswordDTO';
import { UserPassword } from '../../domain/userPassword';

@injectable()
class ChangePasswordUseCase implements IUseCase<ChangePasswordDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ChangePasswordDTO): Promise<void> {
    const existUser = await this.userRepository.findById(data.id);

    if (data.newPassword && !data.oldPassword) {
      throw new Error('You need to inform the old password to set a new password.');
    }

    if (data.newPassword && data.oldPassword) {
      const currentPassword = UserPassword.create({
        value: data.newPassword,
        hashed: false,
      });
      const oldPassword = UserPassword.create({
        value: data.oldPassword,
        hashed: true,
      });

      if (!(await oldPassword.comparePassword(existUser.password.value))) {
        throw new Error('Old password does not match.');
      }

      if (await currentPassword.comparePassword(existUser.password.value)) {
        throw new Error('Equal passwords.');
      }

      await this.userRepository.save({
        id: data.id,
        data: {
          password: await currentPassword.getHashedValue(),
        },
      });
    }
  }
}

export default ChangePasswordUseCase;
